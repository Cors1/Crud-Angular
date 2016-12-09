'use strict';

var gulp   = require('gulp'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
	uglify = require('gulp-uglifyjs'),
    del    = require('del');

var dateTime = new Date();

var year = dateTime.getFullYear();
var month = dateTime.getMonth() + 1;
var day = dateTime.getDate();
var hour = dateTime.getHours();
var minutes = dateTime.getMinutes();

year = year.toString().substring(2);
dateTime = year + "" + month + "" + day + "" + hour + "" + minutes;

gulp.task('filesClean', function () {
    return gulp.src([
        '../Blocks/**/*.js',
        '../Directives/*.js',
        '../Models/*.js',
        '../Templates/**/*.js'
    ])
       .pipe(jshint())
       .pipe(jshint.reporter('default'));
});

gulp.task('filesConcat', ['filesClean'], function () {
    return gulp
        .src([

            '../Blocks/Utils/module.js',
            '../Blocks/Utils/Services/*.js',

            '../Directives/uploaderModel.js',

            '../Models/UserModel.js',

            '../Templates/app.module.js',
            '../Templates/app.config.js',
            '../Templates/app.constants.js',
            '../Templates/create/*.js',
            '../Templates/delete/*.js',
            '../Templates/header/*.js',
            '../Templates/read/*.js',
            '../Templates/update/*.js',
        ])
        .pipe(concat('crudangular-' + dateTime + '.min.js')) //dateTime = year/month/day/hour/minutes
        .pipe(gulp.dest('./concat'));
});

gulp.task('filesMinification', ['filesConcat'], function () {
    return gulp
        .src('./concat/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
});

gulp.task('filesDelete', ['filesMinification'], function () {
    return del([
      './concat' // If you don't want delete a file, just negate a pattern, EJ: '!concat/crudangular.js'
    ]);
});

gulp.task('default', ['filesDelete']);