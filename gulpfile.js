'use strict';

// Require
var gulp = require('gulp'),
    less = require('gulp-less'),
    minify = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    bs = require('browser-sync').create();

// Paths
var paths = {
    'dev': {
        'less': './src/less/',
        'js': './src/js/',
        'vendor': './src/vendor/'
    },
    'production': {
        'css': './dist/assets/css/',
        'js': './dist/assets/js/'
    }
};

// CSS
gulp.task('css', function() {
    return gulp.src(paths.dev.less+'application.less')
        .pipe(plumber())
        .pipe(less())
        .pipe(minify({keepSpecialComments:0}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(paths.production.css))
        .pipe(notify("CSS compilation successful!"));
});

// JS
gulp.task('js', function(){
    return gulp.src([
        // paths.dev.vendor+'jquery/dist/jquery.js',
        paths.dev.js+'application.js'
    ])
    .pipe(concat('application.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.production.js))
    .pipe(notify("JS compilation successful!"));
});

// Tasks
gulp.task('watch', function() {
    gulp.watch(paths.dev.less + '/*.less', ['css']);
    gulp.watch(paths.dev.less + '/*/*.less', ['css']);
    gulp.watch(paths.dev.js + '/*.js', ['js']);
    gulp.watch(paths.dev.js + '/*/*.js', ['js']);
});

gulp.task('browser-sync', function() {
    var files = [
            '**/*.html',
            '**/*.{png,jpg,gif}'
            ];
    /**
     * Run Browsersync with server config
    */
    bs.init({
        server: "dist",
        files: ["dist/css/*.css"],
        plugins: [
            {
                module: "bs-html-injector",
                options: {
                    files: ["dist/*.html"]
                }
            }
        ]
    });
    });

gulp.task('default', ['css', 'js', 'browser-sync']);
