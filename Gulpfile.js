"use strict";

var gulp = require('gulp'),
    lr = require('tiny-lr'), // Mini web-server for livereload
    livereload = require('gulp-livereload'), // Livereload for Gulp
    connect = require('connect'), // Web-server
    uglify = require('gulp-uglify'), // JS minification
    rename = require('gulp-rename'),
    minify = require('gulp-cssnano'),
    sourcemaps = require('gulp-sourcemaps'),
    wrap = require('gulp-wrap'),
    concat = require('gulp-concat'), // Files merge
    autoprefixer = require('gulp-autoprefixer'),
    path = require('path'),
    server = lr();

var outputFolder = 'dist/';
var demoFolder = 'demo/';
var moduleName = 'angular.akPagination';

// Local server for development
gulp.task('http-server', function () {
    connect()
        .use(require('connect-livereload')())
        .use(connect.static('./demo'))
        .listen('9001');

    console.log('Server listening on http://localhost:9001');
});

gulp.task('html', function () {
    return gulp.src(['src/angular.akPagination.tpl.html'])
               .pipe(gulp.dest(outputFolder))
               .pipe(gulp.dest(demoFolder))
               .pipe(livereload(server));
});

gulp.task('build', function () {
    return gulp.src(['src/angular.akPagination.js'])
               .pipe(concat('angular.akPagination.js'))
               .pipe(wrap('"use strict";\n\n(function() {\n<%= contents %>\n})();'))
               .pipe(sourcemaps.init())
               .pipe(gulp.dest(outputFolder))
               .pipe(gulp.dest(demoFolder))
               .pipe(rename({suffix: '.min'}))
               .pipe(uglify())
               .pipe(sourcemaps.write('.'))
               .pipe(gulp.dest(outputFolder))
               .pipe(livereload(server)); // Reload page
});


gulp.task('default', function () {
    gulp.run('html');
    gulp.run('build');

    // Connect livereload
    server.listen(35729, function (error) {
        if (error) {
            return console.log(error);
        }

        gulp.watch(['src/**/*', 'demo/index.html'], function () {
            gulp.run('build');
        });

        gulp.watch(['src/angular.akPagination.tpl.html'], function () {
            gulp.run('html');
        })
    });

    gulp.run('http-server');
});