const path = require('path');

module.exports = {
  // Other configurations...
  resolve: {
    alias: {
      // Other aliases...
      '@img': path.resolve(__dirname, 'src/assets/images') // Adjust the path as necessary
    }
  }
}