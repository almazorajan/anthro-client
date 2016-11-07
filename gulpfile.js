
"use strict";

const gulp = require("gulp");
const browserSync = require("browser-sync").create();

gulp.task("browser-sync", function () {

    browserSync.init({
        injectChanges: false,
        files: ["./**/*.{html,htm,css,js}"],
        watchOptions: { ignored: "node_modules" },
        server: { 
            baseDir: "./", 
            middleware: {
                0: null,
                1: require('connect-history-api-fallback')({
                    index: '/index.html',
                    verbose: true
                })
            }
        },
        port: (process.env.PORT || 6000)
    });

});

gulp.task("default", ["browser-sync"])