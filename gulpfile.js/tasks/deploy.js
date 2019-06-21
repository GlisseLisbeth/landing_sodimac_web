var gulp = require( 'gulp' ),
    plugins = require( 'gulp-load-plugins' )({ camelize: true }),
    del = require( 'del' ),
    config = require( '../../gulpconfig' ).utils,
    deploy      = require( 'gulp-gh-pages' );

gulp.task( 'deploy', function() {
    return gulp.src( './dist/**/*' )
        .pipe( deploy() );
});
