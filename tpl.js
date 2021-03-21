const path = require('path');
const fs = require('fs');

module.exports = function (isFlex, htmlWebpackPlugin, title, env, currentModule) {
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
	 <meta name="keywords" content="<%-keywords%>" />
	 <meta name="description" content="<%-desc%>" />
	 <link rel="shortcut icon"/>
	 ${htmlWebpackPlugin.tags.headTags}
	 <title>${title}</title>
 </head>
 <body>
	 <div id='root'>${body}</div>
	 <script>${env != 'prd' ? '' : 'window.app =<%-app%>;'}</script>
		 ${htmlWebpackPlugin.tags.bodyTags}
		 </body>
 </html>
 `;
};
