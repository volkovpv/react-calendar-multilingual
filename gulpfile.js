/**
 * Created by https://github.com/volkovpv on 07.2015.
 */

var gulp            = require('gulp'),
    liveReload 		= require('gulp-livereload'),
    source          = require('vinyl-source-stream'),
    buffer          = require('vinyl-buffer'),
    browserify      = require('browserify'),
    sourcemaps      = require('gulp-sourcemaps'),
    rename          = require('gulp-rename');

//build react.js
gulp.task('react', function(){
    return browserify({
        entries: ["./src/main.js"],
        extensions: ['.js', '.jsx']
    }, {
        debug: true
    })
        .bundle()
        .pipe(source("main.js"))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write('/source-map'))
        .pipe(gulp.dest("./www/"));
});

//copy css
gulp.task('css', function() {
    gulp.src('styles/*.css')
        .pipe(gulp.dest('www/'));
});

//copy index.html
gulp.task('index', function() {
    gulp.src('src/index.template.html')
        .pipe(rename('index.html'))
        .pipe(gulp.dest('www/'));
});

gulp.task('watch', ['react', 'css', 'index'], function() {
    liveReload({ start: true });

    gulp.watch('./src/**', ['react']);

    gulp.watch('./www/**').on('change', function(file) {
        liveReload.changed(file.path);
    });

});