const path = require('path');

module.exports = {
  mode: 'development', // Set to 'production' for minification and other optimizations
  entry: './app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
