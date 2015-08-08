var gulp = require('gulp'),
    minifyCss = require('gulp-minify-css'),
    concatCss = require('gulp-concat-css'),
    rev = require('gulp-rev'),
    htmlReplace = require('gulp-html-replace'),
    revReplace = require('gulp-rev-replace'),
    htmlMin = require('gulp-htmlmin'),
    path = require('path'),
    revNapkin = require('gulp-rev-napkin'),
    del = require('del'),
    server = require('gulp-server-livereload'),
    filenames = require('gulp-filenames'),
    shell = require('gulp-shell'),
    symlink = require('gulp-symlink'),
    runSequence = require('run-sequence'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    gutil = require('gulp-util'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    browserify = require('browserify');


gulp.task('default', function(callback) {
    runSequence('clean:before',
        ['bundle',
        'watch',
        'serve'],
        callback);
});


gulp.task('bundle', function(callback) {
    runSequence('clean:before',
        ['compile', 'minify-css'],
        ['revision', 'static'],
        'bundle-process-html',
        'clean:after', callback);
});


gulp.task('clean:before', function(callback) {
    del('dist/*', callback);
});


gulp.task('clean:after', function(callback) {
    del('rev-manifest.json', callback);
});


gulp.task('minify-css', function() {
    return gulp.src(['src/css/reset.css', 'src/css/base.css', 'src/**/*.css']).
        pipe(concatCss('style.css', {
            rebaseUrls: false
        })).
        pipe(minifyCss()).
        pipe(gulp.dest('dist'));
});


gulp.task('revision', function() {
    return gulp.src(['dist/script.js', 'dist/style.css']).
        pipe(rev()).
        pipe(gulp.dest('dist')).
        pipe(revNapkin()).
        pipe(rev.manifest()).
        pipe(gulp.dest(''));
});


gulp.task('static', function() {
    return gulp.src('static/**/*').
        pipe(gulp.dest('dist/static'));
});


gulp.task('get-css', function() {
    return gulp.src(['src/**/reset.css', 'src/**/base.css', 'src/**/*.css']).
        pipe(filenames('css'));
});


gulp.task('bundle-process-html', function() {
    var manifest = gulp.src('./rev-manifest.json');

    return gulp.src('src/index.html').
        pipe(htmlReplace({
            'vchat': ['style.css', 'script.js']
        })).
        pipe(gulp.dest('dist')).
        pipe(revReplace({manifest: manifest})).
        pipe(htmlMin({collapseWhitespace: true})).
        pipe(gulp.dest('dist'));
});


gulp.task('watch', function() {
    function changeLogger(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    }

    gulp.watch('src/**/*.js').on('change', changeLogger);
    gulp.watch('src/index.html', ['bundle']).on('change', changeLogger);
});


gulp.task('serve', function() {
    return gulp.src('dist').pipe(server({
        watchPath: 'src',
        port: 1971,
        livereload: {
            enable: true,
            path: 'src'
        },
        open: true
    }));
});


gulp.task('compile', function () {
    // set up the browserify instance on a task basis
    var b = browserify({
        entries: ['./src/app.js'],
        debug: true
    });
    return b.bundle()
        .pipe(source('./src/app.js'))
        .pipe(buffer())
            // Add transformation tasks to the pipeline here.
            .pipe(uglify())
            .on('error', gutil.log)
        .pipe(rename('script.js'))
        .pipe(gulp.dest('./dist/'));
});
