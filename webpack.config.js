const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WorkBoxPlugin = require('workbox-webpack-plugin');

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [{ loader: "babel-loader"}],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
            {
                loader: 'file-loader',
                options: {}
            }
        ]
    },
    {
        test: /\.(svg|eot|woff|ttf|svg|woff2)$/,
        use: [
            {
                loader: 'file-loader',
                options: {
                    name: "[path][name].[ext]"
                }
            }
        ]
    }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html",
    }),
    new WorkBoxPlugin.GenerateSW({
      cacheId: 'reacbootsrapt',
      swDest: 'sw.js',
      clientsClaim: true,
      skipWaiting: true,
      // runtimeCaching:[
      //     {
      //         urlPattern: /\.(?:css|js|html|ttf|eot|woff|woff2|png|json|png|jpg|jpeg|svg)$/,
      //         handler: 'CacheFirst',
      //         options:{
      //             cacheName: 'reacbootsrapt-assets'
      //         }
      //     }
      // ]
    })
  ],
  devServer: {
    inline: true,
    contentBase: "./dist",
    port: 3000,
    historyApiFallback: true,
  },
};
