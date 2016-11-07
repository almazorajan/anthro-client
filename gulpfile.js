
"use strict";

const gulp = require("gulp");
const browserSync = require("browser-sync").create();

gulp.task("browser-sync", function () {

    browserSync.init({
        "injectChanges": false,
        "files": [".app/**/*.{html,htm,css,js}"],
        "watchOptions": { ignored: "node_modules" },
        "server": { "baseDir": "./" },
        "port": (process.env.PORT || 6000)
    });

});

gulp.task("default", ["browser-sync"])