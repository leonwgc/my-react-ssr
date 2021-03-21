# my-react-ssr
react ssr demo, webpack.server.config.js 打包ssr.js为commonjs模块，  webpack.config.js利用html-webpack-plugin templateContent方法，调用上面的ssr模块， 根据传入的mpa当前打包模块名，调用
index.ssr.js 里面定义的ReactDOMServer.renderToString生成html并注入到模板，然后将htmlWebpackPlugin 实例中的tags 注入到模板， 最终页面执行ReactDOM.hydrate注入js逻辑