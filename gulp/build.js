'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

module.exports = function(options) {

  gulp.task('build:styles', ['styles'], function() {
    return gulp.src(options.tmp+'/styles/*.css')
      .pipe($.csso())
      .pipe(gulp.dest(options.dist + '/styles'))
  });

  gulp.task('build:scripts', ['scripts'], function() {
    return gulp.src(options.tmp+'/scripts/*.js')
      .pipe($.uglify({ preserveComments: $.uglifySaveLicense })).on('error', options.errorHandler('Uglify'))
      .pipe(gulp.dest(options.dist + '/scripts'))
  });

  gulp.task('html', ['scripts', 'styles'], function () {
    var htmlFilter = $.filter('*.html');
    var jsFilter = $.filter('../scripts/*.js');
    var cssFilter = $.filter('../styles/*.css');
    var assets;

    return gulp.src(options.src + '/views/**/*.html')
      .pipe(assets = $.useref.assets())
      .pipe($.rev())
      .pipe(jsFilter)
      .pipe($.uglify({ preserveComments: $.uglifySaveLicense })).on('error', options.errorHandler('Uglify'))
      .pipe(jsFilter.restore())
      .pipe(cssFilter)
      .pipe($.csso())
      // .pipe(gulp.dest(options.dist + '/styles'))
      .pipe(cssFilter.restore())
      .pipe(assets.restore())
      .pipe($.useref())
      .pipe($.revReplace())
      // .pipe(htmlFilter)
      // .pipe($.minifyHtml({
      //   empty: true,
      //   spare: true,
      //   quotes: true,
      //   conditionals: true
      // }))
      // .pipe(htmlFilter.restore())
      .pipe(gulp.dest(options.dist + '/views'))
      .pipe($.size({ title: options.dist + '/', showFiles: true }));
  });

  // Only applies for fonts from bower dependencies
  // Custom fonts are handled by the "other" task
  gulp.task('fonts', function () {
    return gulp.src($.mainBowerFiles())
      .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
      .pipe($.flatten())
      .pipe(gulp.dest(options.dist + '/fonts/'));
  });

  gulp.task('other', function () {
    return gulp.src([
      options.src + '/{images,fonts}/*'
    ])
      .pipe(gulp.dest(options.dist + '/'));
  });

  gulp.task('clean', function (done) {
    $.del([options.dist + '/', options.tmp + '/'], done);
  });

  gulp.task('build', ['html', 'fonts']);
};
