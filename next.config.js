require('dotenv').config();
const webpack = require('webpack');
const path = require('path');
const glob = require('glob');
const withImages = require('next-images')
const withSass = require('@zeit/next-sass')

module.exports = withImages({
  webpack: (config, { dev }) => {
    // Setup SASS
    config.module.rules.push(
      {
        test: /\.(css|scss|sass)/,
        loader: 'emit-file-loader',
        options: {
          name: 'dist/[path][name].[ext]'
        }
      },
      {
        test: /\.css$/,
        use: ['babel-loader', 'raw-loader', 'postcss-loader']
      },
      {
        test: /\.s(a|c)ss$/,
        use: [
          'babel-loader',
          'raw-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              includePaths: ['styles', 'node_modules']
                .map(d => path.join(__dirname, d))
                .map(g => glob.sync(g))
                .reduce((a, c) => a.concat(c), [])
            }
          }
        ]
      }
    );

    // Setup environment variables
    config.plugins.push(new webpack.EnvironmentPlugin(process.env));

    return config;
  },
  exportPathMap: function() {
    // Setup static export mapping
    return {
      '/': { page: '/index' }
    };
  }
});
