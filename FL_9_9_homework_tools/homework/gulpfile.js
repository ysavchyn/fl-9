'use strict'

const gulp = require('gulp'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    del = require('del'),
    connect = require('gulp-connect'),
    runSequence = require('run-sequence'),
    cleanCSS = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    pump = require('pump'),
    babel = require('gulp-babel');

sass.compiler = require('node-sass');


gulp.task('concat-js', function () {
    return gulp.src(['./src/js/canvasState.js', './src/js/clock.js', './src/js/app.js'])
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest('./bin/js'));
});

gulp.task('sass-to-css-concat', function () {
    return gulp.src('./src/sass/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('./bin/css'));
});

gulp.task('copy-moment-dev', function () {
    return gulp.src('./node_modules/moment/min/moment.min.js')
        .pipe(gulp.dest('./bin/js'));
});

gulp.task('del-dev', function () {
    return del(['./bin/**']);
});

gulp.task('del-prod', function () {
    return del(['./dist/**']);
});

gulp.task('connect', function () {
    connect.server({
        port: 8080,
        root: './bin',
        livereload: true
    });
});

gulp.task('reload-css-js', function () {
    runSequence(['sass-to-css-concat', 'concat-js']);
    return gulp.src('./bin/index.html')
        .pipe(gulp.dest('./bin'))
        .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch(['./src/**'], ['reload-css-js']);
});

gulp.task('minify-css-prod', () => {
    return gulp.src('./dist/css/style.min.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('babel-and-minify-js', function () {
    pump([
        gulp.src('./dist/js/app.min.js')
        .pipe(babel({
            presets: ['@babel/env']
        })),
        uglify(),
        gulp.dest('./dist/js')
    ]);
});

gulp.task('copy-all', () => {
    return gulp.src('./bin/**')
        .pipe(gulp.dest('./dist'));
});

gulp.task('create-index.html', () => {
    return gulp.src('./src/app.html')
        .pipe(concat('index.html'))
        .pipe(gulp.dest('./bin'));
});

gulp.task('default', ['del-dev', 'build', 'connect', 'watch']);

gulp.task('build-prod', () => {
    runSequence('del-prod', 'copy-all', ['minify-css-prod', 'babel-and-minify-js']);
});

gulp.task('build', () => {
    runSequence('del-dev', ['sass-to-css-concat', 'create-index.html', 'concat-js'], 'copy-moment-dev');
});