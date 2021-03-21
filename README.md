# my-react-ssr
react ssr demo,
 
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

a. 很少更新的静态页面用 1+2 实现 prerender 
b. 需要seo,又动态的页面，可以结合express/koa 动态调用 1生成的 commonjs模块动态返回 ssr
c. 不考虑seo, 用csr也可以的， 可以动态处理2的html注入 ,  csr