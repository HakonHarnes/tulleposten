const path = require('path');

module.exports = {
   entry: './src/app.js',
   output: {
      path: path.resolve(__dirname, 'public'),
      filename: 'bundle.js'
   },
   module: {
      rules: [
         {
            test: /\.js$/,
            include: path.resolve(__dirname, 'src'),
            use: ['babel-loader']
         },
         {
            test: /\.css$/,
            use: [
               'style-loader',
               {
                  loader: 'css-loader',
                  options: {
                     importLoaders: 1,
                     modules: true
                  }
               }
            ],
            include: /\.module\.css$/
         },
         {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
            exclude: /\.module\.css$/
         }
      ]
   }
};