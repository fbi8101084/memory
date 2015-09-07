var gulp = require('gulp');

var gutil  = require('gulp-util');
var compass = require('gulp-compass');
var cssmin = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');

var paths = {
    js: [
        'scripts/config/**/*.js',
        'scripts/helper/**/*.js',
        'scripts/controller/**/*.js',
        'scripts/view/**/*.js',
        'scripts/js_complated/*.js'],
    css: {
        img: '../assets/images',
        path: 'style',
        file: ['style/**/*.scss']
    },
    frontJS: 'scripts/front/**/*.js'
};

var dist = {
    js: '../assets/js/',
    css: '../assets/css/'
};

gulp.task('biuld:css', function () {
    gulp.src(paths.css.file)
        .pipe(compass({
            css: dist.css,
            sass: paths.css.path,
            image: paths.css.img
        }))
        .on('error', function(error) {
            console.log(error);
            this.emit('end');
        })
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cssmin())
        .pipe(gulp.dest(dist.css));
});

gulp.task('biuld:frontJS', function() {
    gulp.src(paths.frontJS)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(dist.js));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.start('biuld:css', 'biuld:js');
    gulp.watch(paths.css.file[0], ['biuld:css']);
    // watch 4 directory js files
    gulp.watch(paths.js[0], ['biuld:js']);
    gulp.watch(paths.js[1], ['biuld:js']);
    gulp.watch(paths.js[2], ['biuld:js']);
    gulp.watch(paths.js[3], ['biuld:js']);
    gulp.watch(paths.js[4], ['biuld:js']);
    gulp.watch(paths.frontJS, ['biuld:frontJS']);
});

gulp.task('default', function() {
    gulp.start('biuld:css', 'biuld:js', 'biuld:frontJS');
});