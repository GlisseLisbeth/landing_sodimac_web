// ==== HTML ==== //

var gulp = require('gulp'),
    del = require('del'),
    rename = require('gulp-rename'),
    include = require('gulp-include'),
    version = require('gulp-version-number'),
    replace = require('gulp-replace'),
    config = require('../../gulpconfig');

gulp.task('html-cleanup', function() {
    return del([config.html.dest + '*.html', config.html.dest + '*.shtml']);
});
gulp.task('html-cleanup-dist', function() {
    return del([
        config.html.destDist + '*.html',
        config.html.destDist + '*.shtml'
    ]);
});
gulp.task('html', ['html-cleanup'], function() {
    return gulp
        .src(config.html.src)
        .pipe(replace('<!-- replace_url -->', ''))
        .pipe(replace('<!-- min -->', ''))
        .pipe(
            version({
                value: '%MDS%',
                append: {
                    key: 'ver',
                    to: ['css', 'js', 'image']
                }
            })
        )
        .pipe(include({}))
        .pipe(replace('<base href="/sodimac-pe/" />', ''))
        .pipe(
            replace(
                /w*(?<!www\.sodimac\.com\.pe)\/static/g,
                'http://www.sodimac.com.pe/static'
            )
        )
        .pipe(
            rename({
                extname: '.html'
            })
        )
        .on('error', console.log)
        .pipe(gulp.dest(config.html.dest));
});

gulp.task('html-dist', ['html-cleanup-dist'], function() {
    return gulp
        .src(config.html.src)
        .pipe(replace('<!-- replace_url -->', config.urls.prod))
        .pipe(replace('<!-- min -->', '.min'))
        .pipe(
            version({
                value: '%MDS%',
                append: {
                    key: 'ver',
                    to: ['css', 'js', 'image']
                }
            })
        )
        .pipe(replace(/<!--=include.*-->/g, '')) // Get rid of all includes
        .on('error', console.log)
        .pipe(gulp.dest(config.html.destDist));
});
