'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');
var util = require('util');
/*function isOnlyChange(event) {
  return event.type === 'changed';
}*/

module.exports = function(options) {
  function browserSyncInit(baseDir, browser) {
    browser = browser === undefined ? 'default' : browser;

    var routes = null;
    if(baseDir === options.src || (util.isArray(baseDir) && baseDir.indexOf(options.src) !== -1)) {
      routes = {
        '/bower_components': 'bower_components'
      };
    }

    var server = {
      baseDir: baseDir,
      routes: routes
    };

    /*if(middleware.length > 0) {
      server.middleware = middleware;
    }*/

    browserSync.instance = browserSync.init({
      startPath: '/',
      // server: server,
      browser: browser,
      proxy: 'http://localhost:3000'
    });
  }

  gulp.task('watch', ['scripts:watch'], function () {

    gulp.watch([
      options.src + '/scss/**/*.scss'
    ], function(event) {
      gulp.start('styles');
    });

    gulp.watch(options.src + '/views/**/*.html', function(event) {
      browserSync.reload(event.path);
    });
  });

  gulp.task('dev', ['build', 'watch', 'nodemon'], function () {
    browserSyncInit([options.tmp + '/', options.src]);
  });

  gulp.task('nodemon', function (cb) {
    var called = false;
    return nodemon({
      script: 'server/app.js',
      watch: ['server/**/*'],
      ignore: [
        '.tmp',
        'frontend/bower_components/**',
        'node_modules/**',
        'dist/**'
      ]
    }).on('start', function () {
        if (!called) { cb(); }
        called = true;
    }).on('restart', function onRestart() {
      // reload connected browsers after a slight delay
      setTimeout(function reload() {
        browserSync.reload({
          stream: false
        });
      }, 500);
    });
  });
};
