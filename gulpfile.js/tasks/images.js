// ==== IMAGES ==== //

var gulp = require( 'gulp' ),
    del = require( 'del' ),
    $ = require( 'gulp-load-plugins' )({ camelize: true }),
    config = require( '../../gulpconfig' );

gulp.task( 'images-clean', function() {
    return del( config.images.dest );
});

// Copy changed images from the source folder to `build` (fast)
gulp.task( 'images', [ 'images-clean' ], function() {
    return ( gulp
        .src( config.images.src )

        //.pipe($.changed(config.images.dest))
        .pipe( gulp.dest( config.images.dest ) ) );
});

// Optimize images in the `dist` folder (slow)
gulp.task( 'images-optimize', function() {
    return gulp
        .src( config.images.src )
        .pipe( $.imagemin( config.images.imagemin ) )
        .pipe( gulp.dest( config.images.destDist ) );
});
