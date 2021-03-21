
## react 服务端渲染架构    
  

1. webpack.server.config.js 打包ssr.js为commonjs模块, 导出一个对象，key为src目录下模块目录名，value为
模块目录里面index.ssr.js导出的render函数
```javascript
function render() {
  return ReactDOMServer.renderToString(<App />);
} 
```
2. webpack.config.js利用html-webpack-plugin templateContent方法，通过引用上述ssr导出对象，动态获取组件渲染的html字符串，并插入到模板

3. 最后将htmlWebpackPlugin 实例中的tags 注入到模板， 最终页面执行ReactDOM.hydrate 实现react激活

4. 开发的时候可以忽略第一步， 只处理csr, 发布的时候可以考虑 以下3种情况：

 >* a. 很少更新的静态页面用 1+2 实现构建时 prerender 
 >* b. 需要seo的动态页面，可以结合express/koa 动态调用 1生成的 commonjs模块动态返回, 实现ssr
 >* c. 不考虑seo, 用csr也可以的， 可以动态处理2的html注入 ,  实现csr

 ###  html-webpack-plugin 模板代码
   
   
 ```javascript
 const path = require('path');
const fs = require('fs');

module.exports = function (htmlWebpackPlugin, currentModule) {
  let renderer = {};
  // 这里引用实现prerender , 放在express/koa里面引用实现 ssr , 不引用则是通常的csr
  if (fs.existsSync(path.resolve('./dist-ssr/index.js'))) {
    try {
      renderer = require('./dist-ssr').default;
    } catch (ex) {}
  }

  // 如果需要ssr , body可以定义一个ejs 插值表达式 e.g.  <%-body%> ,由ejs render注入 
  // 包括后面的状态注入， window.app={} // window.app=<%- initialState%>
  let body = '';
  if (typeof renderer[currentModule] === 'function') {
    body = renderer[currentModule]();
  }

  return `
 <!doctype html>
 <html lang="zh-cn">
 <head>
	 <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
   <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,minimal-ui,viewport-fit=cover">
	 <meta name="format-detection" content="telephone=no, email=no"><meta name="apple-mobile-web-app-capable" content="yes">
	 <meta name="apple-touch-fullscreen" content="yes">
	 ${htmlWebpackPlugin.tags.headTags}
   <link rel="shortcut icon"/>
	 <title>${htmlWebpackPlugin.options.title}</title>
 </head>
 <body>
	 <div id='root'>${body}</div>
	 <script>window.app ={};</script>
		 ${htmlWebpackPlugin.tags.bodyTags}
		 </body>
 </html>
 `;
};

 ```