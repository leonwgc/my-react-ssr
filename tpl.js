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
