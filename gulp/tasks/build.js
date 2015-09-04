var gulp = require('gulp');
var gutil = require('gulp-util');
var eslint = require('gulp-eslint');
var excludeGitignore = require('gulp-exclude-gitignore');
var nsp = require('gulp-nsp');
var babel = require('gulp-babel');
var preprocess = require('gulp-preprocess');

var config = require('../config');
var context = require('../context');

gulp.task('static', function () {
  return gulp.src(config.src)
    .pipe(excludeGitignore())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('nsp', function (cb) {
  nsp('package.json', cb);
});

gulp.task('babel', function () {
  return gulp.src(config.src)
    .pipe(preprocess({context: context[gutil.env.type]}))
    .pipe(babel())
    .pipe(gulp.dest(config.dest));
});

gulp.task('watch', ['browserify', 'babel'], function() {
  gulp.watch(config.src, ['browserify', 'babel']);
});

gulp.task('prepublish', ['nsp', 'babel', 'browserify']);
gulp.task('default', ['static', 'test']);
gulp.task('dev', ['watch']);