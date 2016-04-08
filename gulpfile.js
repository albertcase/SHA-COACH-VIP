var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    minify = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync').create();

var path = {
    all:['golden-card.html','diamond-card.html','css/*.css','js/*.js','images/*.*'],
    template:['golden-card.html','diamond-card.html'],
    css:['css/*.css'],
    js:['js/*.js'],
    images:['images/*.*']
};

// Browser-sync
gulp.task('browser-sync', function() {
    browserSync.init(path.all,{
        server: {
            baseDir: "./",
            startPath: 'golden-card.html'
        }
    });
});

gulp.task('copy', function(){
    var start = path.template;
    return gulp.src(start)
        //.pipe(watch(start))
        .pipe(gulp.dest('dist', {
            start: start
        }));
});

gulp.task('images', function(){
    var start = path.images;
    return gulp.src(start)
        .pipe(gulp.dest('dist/images/', {
            start: start
        }));
});

gulp.task('css', function () {
    // 1. 找到文件
    gulp.src(path.css)
        //.pipe(concat('style.css'))
        // 2. 压缩文件
        .pipe(minify())
        // 3. 另存为压缩文件
        .pipe(gulp.dest('dist/css/'));
});

gulp.task('js', function () {
    // 1. 找到文件
    gulp.src(path.js)
        //.pipe(concat('style.css'))
        // 2. 压缩文件
        .pipe(uglify())
        // 3. 另存为压缩文件
        .pipe(gulp.dest('dist/js/'));
});

gulp.task('default',['browser-sync']);
gulp.task('uf', ['copy','css','js','images']);