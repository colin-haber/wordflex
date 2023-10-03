module.exports = {
  mode: "development",
  devtool: "inline-source-map",
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
};
