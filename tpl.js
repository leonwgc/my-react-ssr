const path = require('path');
const fs = require('fs');

module.exports = function (htmlWebpackPlugin, currentModule) {
  let renderer = {};
  if (fs.existsSync(path.resolve('./dist-ssr/index.js'))) {
    try {
      renderer = require('./dist-ssr').default;
    } catch (ex) {}
  }

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
