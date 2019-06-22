// ==== MAIN ==== //

var gulp = require( 'gulp' );

// Default task chain: build -> watch
gulp.task( 'default', [ 'watch' ]);

// One-off setup tasks
//gulp.task('setup', ['utils-normalize']);

// Build a working copy of the theme
gulp.task( 'build', [ 'html', 'images', 'scripts', 'styles', 'fonts' ]);
gulp.task( 'dist', [
    'html-dist',
    'images-optimize',
    'scripts-dist',
    'styles-dist',
    'fonts-dist'
]);

gulp.task( 'deploy' );

// Dist task chain: wipe -> build -> clean -> copy -> compress images
// NOTE: this is a resource-intensive task!
//gulp.task('dist', ['images-optimize']);
