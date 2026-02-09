const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const path = require('path');

module.exports = {
    ...defaultConfig,
    entry: './assets/js/dashboard.js',
    output: {
        path: path.resolve(__dirname, 'assets/js/build'),
        filename: 'dashboard.js',
    },
};
