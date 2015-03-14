'use strict';

var gulp = require('gulp');
var lazypipe = require('lazypipe');
var eslint = require('gulp-eslint');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var marked = require('gulp-markdown');
var sass = require('gulp-sass');
var highlight = require('highlight.js');
var rimraf = require('rimraf');

var src = {
  js: 'src/js/**/*.js',
  md: 'src/markdown/**/*.md',
  sass: 'src/sass/**/*.scss',
  spec: 'spec/**/*.js',
}

var dest = {
  dist: 'public/js',
  html: 'public/html',
  css: 'public/css',
  js: 'scripts.js',
  min: 'scripts.min.js',
}

gulp.task('lint', function () {
  return gulp.src(src.js)
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('clean:markdown', function (done) {
  rimraf(dest.html, done);
})

gulp.task('markdown', ['clean:markdown'], function () {
  return gulp.src(src.md)
    .pipe(marked({
      highlight: function (code, name) {
        try {
          return highlight.highlight(name, code, true).value;
        } catch (e) {}
      }
    }))
    .pipe(gulp.dest(dest.html))
});

gulp.task('styles', function () {
  return gulp.src(src.sass)
    .pipe(sass({ errLogToConsole: true }))
    .pipe(rename('styles.css'))
    .pipe(gulp.dest(dest.css));
});

gulp.task('scripts', function () {
  return gulp.src(src.js)
    .pipe(browserify({}))
    .pipe(rename(dest.js))
    .pipe(gulp.dest(dest.dist))

    .pipe(uglify())
    .pipe(rename(dest.min))
    .pipe(gulp.dest(dest.dist));
});

gulp.task('test', ['lint'], function () {
});

gulp.task('watch', ['build'], function () {
  gulp.watch(src.md, ['markdown']);
  gulp.watch(src.js, ['scripts']);
  gulp.watch(src.sass, ['styles']);
});

gulp.task('build', ['markdown', 'scripts', 'styles']);

gulp.task('default', ['watch']);
