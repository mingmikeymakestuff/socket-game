module.exports = {
    entry: [
      './src/index.tsx'
    ],
    output: {
      path: __dirname,
      publicPath: '/',
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
            test: /\.tsx$/,
            exclude: /node_modules/,
            use: {
              loader: "ts-loader"
            }
        },
        {
            test: /\.ts$/,
            exclude: /node_modules/,
            use: {
              loader: "ts-loader"
            }
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: "style-loader"
            },
            {
              loader: "css-loader",
              options: {
                modules: true,
                importLoaders: 1,
                localIdentName: "[name]_[local]_[hash:base64]",
                sourceMap: true,
                minimize: true
              }
            }
          ]
        }
      ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
      },
  };