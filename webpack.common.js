const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv');
const fs = require('fs'); // to check if the file exists
const CopyPlugin = require('copy-webpack-plugin');

const BG_IMAGES_DIRNAME = 'bgimages';

module.exports = (env) => {
  // Get the root path (assuming your webpack config is in the root of your project!)
  const currentPath = path.join(__dirname);

  // Create the fallback path (the production .env)
  const basePath = currentPath + '/.env';

  // We're concatenating the environment name to our filename to specify the correct env file!
  const envPath = basePath + '.' + env.ENVIRONMENT;

  // Check if the file exists, otherwise fall back to the production .env
  const finalPath = fs.existsSync(envPath) ? envPath : basePath;

  // Set the path parameter in the dotenv config
  const fileEnv = dotenv.config({ path: finalPath }).parsed;

  // reduce it to a nice object
  const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
    return prev;
  }, {});


  return {
    entry: {
      app: path.resolve(__dirname, 'app', 'index.tsx')
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'app', 'index.html'),
        favicon: path.resolve(__dirname, 'app', 'favicon.ico')
      }),
      new webpack.DefinePlugin(envKeys),
      new CopyPlugin({
        patterns: [
          { from: path.resolve(__dirname, 'app', 'config.json'), to: path.resolve(__dirname, 'dist') },
        ],
      })
    ],
    module: {
      rules: [
        {
          test: /\.(tsx|ts|jsx)?$/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
                experimentalWatchApi: true,
              }
            }
          ]
        },
        {
          test: /\.(svg|ttf|eot|woff|woff2)$/,
          // only process modules with this loader
          // if they live under a 'fonts' or 'pficon' directory
          include: [
            path.resolve(__dirname, 'node_modules/patternfly/dist/fonts'),
            path.resolve(__dirname, 'node_modules/@patternfly/react-core/dist/styles/assets/fonts'),
            path.resolve(__dirname, 'node_modules/@patternfly/react-core/dist/styles/assets/pficon'),
            path.resolve(__dirname, 'node_modules/@patternfly/patternfly/assets/fonts'),
            path.resolve(__dirname, 'node_modules/@patternfly/patternfly/assets/pficon')
          ],
          use: {
            loader: 'file-loader',
            options: {
              // Limit at 50k. larger files emited into separate files
              limit: 5000,
              outputPath: 'fonts',
              name: '[name].[ext]',
            }
          }
        },
        {
          test: /\.svg$/,
          include: input => input.indexOf('background-filter.svg') > 1,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 5000,
                outputPath: 'svgs',
                name: '[name].[ext]',
              }
            }
          ]
        },
        {
          test: /\.svg$/,
          // only process SVG modules with this loader if they live under a 'bgimages' directory
          // this is primarily useful when applying a CSS background using an SVG
          include: input => input.indexOf(BG_IMAGES_DIRNAME) > -1,
          use: {
            loader: 'svg-url-loader',
            options: {}
          }
        },
        {
          test: /\.svg$/,
          // only process SVG modules with this loader when they don't live under a 'bgimages',
          // 'fonts', or 'pficon' directory, those are handled with other loaders
          include: input => (
            (input.indexOf(BG_IMAGES_DIRNAME) === -1) &&
            (input.indexOf('fonts') === -1) &&
            (input.indexOf('background-filter') === -1) &&
            (input.indexOf('pficon') === -1)
          ),
          use: {
            loader: 'raw-loader',
            options: {}
          }
        },
        {
          test: /\.(jpg|jpeg|png|gif)$/i,
          include: [
            path.resolve(__dirname, 'app'),
            path.resolve(__dirname, 'node_modules/patternfly'),
            path.resolve(__dirname, 'node_modules/@patternfly/patternfly/assets/images'),
            path.resolve(__dirname, 'node_modules/@patternfly/react-styles/css/assets/images'),
            path.resolve(__dirname, 'node_modules/@patternfly/react-core/dist/styles/assets/images'),
            path.resolve(__dirname, 'node_modules/@patternfly/react-core/node_modules/@patternfly/react-styles/css/assets/images'),
            path.resolve(__dirname, 'node_modules/@patternfly/react-table/node_modules/@patternfly/react-styles/css/assets/images'),
            path.resolve(__dirname, 'node_modules/@patternfly/react-inline-edit-extension/node_modules/@patternfly/react-styles/css/assets/images')
          ],
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 5000,
                outputPath: 'images',
                name: '[name].[ext]',
              }
            }
          ]
        }
      ]
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      plugins: [
        new TsconfigPathsPlugin({
          configFile: path.resolve(__dirname, './tsconfig.json')
        })
      ],
      symlinks: false,
      cacheWithContext: false
    },
  }
};
