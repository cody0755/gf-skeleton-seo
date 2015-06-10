'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var $ = require('gulp-load-plugins')();

module.exports = function(options) {
    gulp.task('styles', function() {
        var sassOptions = {
          sourceComments: 'map',
          style: 'expanded'
        };

        return gulp.src([
            options.src+'/scss/*.scss'
        ])
        .pipe($.ignore.exclude(function(file) {
          return !file._contents.length;
        }))
        .pipe($.sourcemaps.init())
        .pipe($.sass(sassOptions)).on('error', options.errorHandler('Sass'))
        /*.pipe($.compass({
            debug: false,
          style: 'expanded',
          // relative, generated_images_path
          generated_images_path: options.tmp + '/images',
          css: options.tmp + '/styles',
          sass: options.src + '/scss',
          image: 'frontend/images'
        })).on('error', options.errorHandler('Sass'))*/
        .pipe($.autoprefixer()).on('error', options.errorHandler('Autoprefixer'))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest(options.tmp + '/styles/'))
        .pipe(browserSync.reload({ stream: true }));
    });
}