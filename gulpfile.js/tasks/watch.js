// ==== WATCH ==== //

var gulp = require( 'gulp' ),
    config = require( '../../gulpconfig' );

// Task chain: build -> watch
gulp.task( 'watch', [ 'browsersync' ], function() {
    gulp.watch( config.html.src, [ 'html' ]);
    gulp.watch( config.styles.src, [ 'styles' ]);
    gulp.watch( config.scripts.minify.src, [ 'scripts' ]);
    gulp.watch( config.images.src, [ 'images' ]);
    gulp.watch( config.fonts.src, [ 'fonts' ]);
});
