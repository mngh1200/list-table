const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');


module.exports = [
  {
    entry: './src/js/main.js',
    output: {
      path: __dirname + '/dist', // 出力先ディレクトリ
      filename: 'bundle.js'
    },
    devServer: {
      contentBase: path.resolve(__dirname, "dist"), // distディレクトリのファイルを確認する
      port: 3000, // 3000ポートを利用
    }
  },
  {
    entry: {
      style: "./src/sass/style.scss", // トランスパイル対象
    },
    output: {
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            { loader: MiniCssExtractPlugin.loader },
            { loader: 'css-loader' },
            { loader: 'sass-loader' },
          ],
        }
      ],
    },
    plugins:[
      // cssの出力先を指定する
      new MiniCssExtractPlugin({ filename: 'css/[name].css' }),
    ],
    optimization: {
      minimizer: [new OptimizeCSSAssetsPlugin({})],
    },
  }
];
