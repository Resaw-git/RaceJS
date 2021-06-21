const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const cssLoader = addition => {
  const loaders = [
      {
          loader: MiniCssExtractPlugin.loader,
      },
      'css-loader'
  ]
  if (addition) {
      loaders.push(addition)
  }
  return loaders
};

/*const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`
*/

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new MiniCssExtractPlugin({
    filename: ('style.css')
  })
  ],
  
module: {
  rules: [
      {
          test: /\.css$/,
          use: cssLoader()
      },
      {
          test: /\.less$/,
          use: cssLoader('less-loader')
      },
      {
          test: /\.s[ac]ss$/,
          use: cssLoader('sass-loader')
      }
    ]
}
}