const Copy = require("copy-webpack-plugin");
const Html = require("html-webpack-plugin");
const SubresourceIntegrity = require("webpack-subresource-integrity").SubresourceIntegrityPlugin;
module.exports = {
  mode: "development",
  devtool: "source-map",
  entry: {
    action: "./src/action.ts",
    background: "./src/background.ts",
    content: "./src/content.ts",
  },
  output: {
    filename: "[name].js",
    clean: true,
    crossOriginLoading: "anonymous",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    extensionAlias: {
      ".js": [".js", ".ts"],
      ".cjs": [".cjs", ".cts"],
      ".mjs": [".mjs", ".mts"],
    },
  },
  module: {
    rules: [
      {
        test: /\.svg$/i,
        type: "asset/resource"
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          "css-loader",
        ],
      },
      {
        test: /\.([cm]?ts|tsx)$/i,
        loader: "ts-loader",
      },
    ],
  },
  plugins: [
    new Copy({
      patterns: [
        {
          from: "./src/manifest.json",
          to: "./manifest.json",
        },
        {
          from: "./src/icon.png",
          to: "./icon-64.png",
        },
        {
          from: "./i18n",
          to: "./_locales",
        },
      ],
    }),
    new Html({
      title: "Wordflex",
      filename: "action.html",
      chunks: [
        "action",
      ],
    }),
    new SubresourceIntegrity(),
  ],
};
