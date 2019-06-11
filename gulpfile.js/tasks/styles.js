// ==== STYLES ==== //

var gulp = require( 'gulp' ),
    $ = require( 'gulp-load-plugins' )({ camelize: true }),
    plumber = require( 'gulp-plumber' ),
    gcmq = require( 'gulp-group-css-media-queries' ),
    config = require( '../../gulpconfig' ),
    autoprefixer = require( 'autoprefixer' ),
    del = require( 'del' ),
    processors = [ autoprefixer( config.styles.autoprefixer ) ];

gulp.task( 'styles-cleanup', function() {
    del.sync([ config.styles.dest + '*.css*' ], { force: true });
});
gulp.task( 'styles-cleanup-dist', function() {
    del.sync([ config.styles.destDist + '*.css*' ], { force: true });
});

// Build stylesheets from source Sass files, autoprefix, and write source maps (for debugging) with libsass
gulp.task( 'styles', [ 'styles-cleanup' ], function() {
    return gulp
        .src( config.styles.src )
        .pipe( plumber() )
        .pipe( $.replace( '<!-- replace_url -->', '' ) )
        .pipe( $.sourcemaps.init() )
        .pipe( $.sass( config.styles.sass ) )
        .pipe( gcmq() )
        .pipe( $.postcss( processors ) )
        .pipe( gulp.dest( config.styles.dest ) )
        .pipe(
            $.rename({
                extname: '.min.css'
            })
        )
        .pipe( $.cssnano( config.styles.minify ) )
        .pipe( $.sourcemaps.write( './' ) ) // Writes an external sourcemap
        .pipe( gulp.dest( config.styles.dest ) ); // Drops the unminified CSS file into the `build` folder
});

// Build stylesheets from source Sass files, autoprefix, and write source maps (for debugging) with libsass
gulp.task( 'styles-dist', [ 'styles-cleanup-dist' ], function() {
    return gulp
        .src( config.styles.src )
        .pipe( plumber() )
        .pipe( $.replace( '<!-- replace_url -->', config.urls.prod ) )
        .pipe( $.sourcemaps.init() )
        .pipe( $.sass( config.styles.sass ) )
        .pipe( gcmq() )
        .pipe( $.postcss( processors ) )
        .pipe( gulp.dest( config.styles.destDist ) )
        .pipe(
            $.rename({
                extname: '.min.css'
            })
        )
        .pipe( $.cssnano( config.styles.minify ) )
        .pipe( $.sourcemaps.write( './' ) ) // Writes an external sourcemap
        .pipe( gulp.dest( config.styles.destDist ) ); // Drops the unminified CSS file into the `build` folder
});
