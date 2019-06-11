// ==== FONTS ==== //

var gulp = require('gulp'),
    del = require('del'),
    plugins = require('gulp-load-plugins')({ camelize: true }),
    config = require('../../gulpconfig');

gulp.task('fonts-cleanup', function() {
    return del([ config.fonts.dest ]);
});
gulp.task('fonts-cleanup-dist', function() {
    return del([ config.fonts.destDist ]);
});

// Copy everything under `src/fonts` indiscriminately
gulp.task('fonts', ['fonts-cleanup'], function() {
    return gulp.src(config.fonts.src)
        .pipe(plugins.changed(config.fonts.dest))
        .pipe(gulp.dest(config.fonts.dest));
});
gulp.task('fonts-dist', ['fonts-cleanup-dist'], function() {
    return gulp.src(config.fonts.src)
        .pipe(plugins.changed(config.fonts.destDist))
        .pipe(gulp.dest(config.fonts.destDist));
});
