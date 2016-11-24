'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var rimraf = require('gulp-rimraf');
var inject = require("gulp-inject");
var jshint = require('gulp-jshint');
var ngmin = require('gulp-ngmin');
var ngannotate = require('gulp-ng-annotate');
var sass = require('gulp-sass');
var manifest = require('gulp-manifest');
var rename = require("gulp-rename");
var templateCache = require('gulp-angular-templatecache');
var fs = require('fs');
var uglify = require('gulp-uglify');

gulp.task('lint', function () {
    return gulp.src('src/main/webapp/resources/scripts/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('clean', function () {
    return gulp.src([
        'src/main/webapp/resources/dist/vendor.js',
        'src/main/webapp/resources/dist/build.js',
        'src/main/webapp/resources/dist/templates.js'
    ], {read: false})
        .pipe(rimraf());
});

gulp.task('sass', [], function() {
    gulp.src(['./src/main/webapp/resources/css/*.scss',
        '!./src/main/webapp/resources/css/*-old.scss'])
        .pipe(sass())
        .pipe(rename('project.css'))
        .pipe(gulp.dest('./src/main/webapp/resources/css/'));
});

gulp.task('js:lib', function (done) {
    return gulp.src([
        'src/main/webapp/resources/js/angular.min.js',
        'src/main/webapp/resources/js/angular-animate.min.js',
        'src/main/webapp/resources/js/angular-resource.min.js',
        'src/main/webapp/resources/js/angular-route.min.js',
        'src/main/webapp/resources/js/angulartics.min.js',
        'src/main/webapp/resources/js/angulartics-ga.min.js',
        'src/main/webapp/resources/js/lodash.min.js',
        'src/main/webapp/resources/js/moment.min.js',
        'src/main/webapp/resources/js/ui-bootstrap-1.3.3.min.js',
        'src/main/webapp/resources/js/fb.js',
        'src/main/webapp/resources/js/sc-sdk-3.1.1.js'
    ])
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('src/main/webapp/resources/dist/'));
});

gulp.task('js:scripts', function (done) {
    return gulp.src([
        'src/main/webapp/resources/scripts/app.js',
        'src/main/webapp/resources/scripts/services/*.js',
        'src/main/webapp/resources/scripts/directives/*.js',
        'src/main/webapp/resources/scripts/components/**/*.js',
        'src/main/webapp/resources/scripts/controllers/**/*.js'
    ])
        .pipe(concat('build.js'))
        .pipe(ngannotate({add: true}))
        .pipe(ngmin())
        .pipe(uglify({mangle: true}))
        .pipe(gulp.dest('src/main/webapp/resources/dist/'));
});

gulp.task('templates', function (done) {
    return gulp.src([
        'src/main/webapp/resources/scripts/controllers/**/*.html',
        'src/main/webapp/resources/scripts/components/**/*.html'
        ])
        .pipe(templateCache({module: 'app', root: 'src/main/webapp/resources/scripts/controllers/'}))
        .pipe(gulp.dest('src/main/webapp/resources/dist/'));
});

gulp.task('build', ['clean', 'js:lib', 'js:scripts', 'templates'], function (done) {

    return gulp.src('src/main/webapp/WEB-INF/views/index.jsp')
        .pipe(inject(gulp.src(
            ['src/main/webapp/resources/dist/vendor.js',
            'src/main/webapp/resources/dist/build.js',
            'src/main/webapp/resources/dist/templates.js'],
            {read: false}),
            {ignorePath: '/src/main/webapp/', addPrefix: '', addRootSlash: false, starttag: '<!-- inject:js -->'}
            ))
        .pipe(gulp.dest('src/main/webapp/WEB-INF/views/'));
});