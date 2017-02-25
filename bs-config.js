
/*
 |--------------------------------------------------------------------------
 | Browser-sync config file
 |--------------------------------------------------------------------------
 |
 | For up-to-date information about the options:
 |   http://www.browsersync.io/docs/options/
 |
 | There are more options than you see here, these are just the ones that are
 | set internally. See the website for more info.
 |
 |
 */

const process = require("process");

module.exports = {
    "files": [
        "./**/*.{html,htm,css,js}"
    ],
    "watchOptions": {
        "ignored": "node_modules"
    },
    "server": {
        "baseDir": "./",
        "middleware": []
    },
    "port": process.env.PORT ? process.env.PORT : 3000,
    "injectChanges": false,
    "open": false,
    "minify": true,
    "codeSync": false
};