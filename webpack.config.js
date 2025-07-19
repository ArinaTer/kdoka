const path = require("path");
const glob = require("glob");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const pages = glob.sync("./src/views/pages/*.html");
const htmlPlugins = pages.map((templatePath) => {
  const name = path.basename(templatePath, ".html");
  return new HtmlWebpackPlugin({
    filename: `${name}.html`,
    template: templatePath,
    minify: false,
    inject: "body",
  });
});

module.exports = {
  mode: "development",
  entry: {
    vendors: "./src/styles/vendors.scss",
    main: "./src/scripts/index.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "assets/scripts/[name].js",
    clean: true,
  },
  devtool: false,

  optimization: {
    minimize: false,
    minimizer: [],
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        nodeVendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "node-vendors",
          filename: "assets/scripts/node-vendors.js",
          chunks: "all",
          enforce: true,
          priority: 10,
        },
        common: {
          name: "common",
          filename: "assets/scripts/common.js",
          minChunks: 2,
          chunks: "all",
          priority: 5,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.(woff2?|ttf)$/,
        type: "asset/resource",
        generator: {
          filename: "assets/fonts/[name][ext]",
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/images/[name][ext]",
        },
      },
      {
        test: /\.html$/,
        use: [
          "html-loader",
          {
            loader: "posthtml-loader",
            options: {
              plugins: [
                require("posthtml-include")({
                  root: path.resolve(__dirname, "src/views/blocks"),
                }),
              ],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    ...htmlPlugins,
    new MiniCssExtractPlugin({
      filename: "assets/styles/[name].css",
      experimentalUseImportModule: false,
    }),
  ],
  devServer: {
    static: "./dist",
    hot: true,
  },
};
