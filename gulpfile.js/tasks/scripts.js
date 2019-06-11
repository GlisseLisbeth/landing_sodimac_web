// ==== SCRIPTS ==== //

var gulp        = require( 'gulp' ),
    plumber     = require( 'gulp-plumber' ),
    merge       = require( 'merge-stream'),
    $           = require( 'gulp-load-plugins' )({ camelize: true }),
    config      = require( '../../gulpconfig' ),
    del         = require( 'del' );

gulp.task( 'scripts-cleanup', function() {
    return del.sync( config.scripts.dest, { force: true });
});
gulp.task( 'scripts-cleanup-dist', function() {
    return del.sync( config.scripts.destDist, { force: true });
});

// Check core scripts for errors
gulp.task( 'scripts-lint', function() {
    return gulp
        .src( config.scripts.lint.src )
        .pipe( $.eslint() )
        .pipe( $.eslint.format() ); // No need to pipe this anywhere
});

gulp.task('scripts-bundle', ['scripts-lint'], function(){
    var bundles = [];
    // Iterate through all bundles defined in the configuration
    for (var bundle in config.scripts.bundles) {
        if (config.scripts.bundles.hasOwnProperty(bundle)) {
            var chunks = [];
            // Iterate through each bundle and mash the chunks together
            config.scripts.bundles[bundle].forEach(function(chunk){
                chunks = chunks.concat(config.scripts.chunks[chunk]);
            });
            // Push the results to the bundles array
            bundles.push([bundle, chunks]);
        }
    }
    // Iterate through each bundle in the bundles array
    var tasks = bundles.map(function(bundle) {
        return gulp.src(bundle[1]) // bundle[1]: the list of source files
            .pipe($.concat(bundle[0].replace(/_/g, '-') + '.js')) // bundle[0]: the nice name of the script; underscores are replaced with hyphens
            .pipe(gulp.dest(config.scripts.dest));
    });
    // Cross the streams ;)
    return merge(tasks);
});

gulp.task('scripts-bundle-dist', ['scripts-lint'], function(){
    var bundles = [];
    // Iterate through all bundles defined in the configuration
    for (var bundle in config.scripts.bundles) {
        if (config.scripts.bundles.hasOwnProperty(bundle)) {
            var chunks = [];
            // Iterate through each bundle and mash the chunks together
            config.scripts.bundles[bundle].forEach(function(chunk){
                chunks = chunks.concat(config.scripts.chunks[chunk]);
            });
            // Push the results to the bundles array
            bundles.push([bundle, chunks]);
        }
    }
    // Iterate through each bundle in the bundles array
    var tasks = bundles.map(function(bundle) {
        return gulp.src(bundle[1]) // bundle[1]: the list of source files
            .pipe($.concat(bundle[0].replace(/_/g, '-') + '.js')) // bundle[0]: the nice name of the script; underscores are replaced with hyphens
            .pipe(gulp.dest(config.scripts.destDist));
    });
    // Cross the streams ;)
    return merge(tasks);
});


// Minify scripts in place

gulp.task( 'scripts-minify-dist', [ 'scripts-bundle-dist' ], function() {
    return gulp
        .src( config.scripts.minify.src)
        .pipe( plumber() )
        .pipe( $.sourcemaps.init() )
        .pipe( gulp.dest( config.scripts.destDist ) )
        .pipe( $.rename({ extname: '.min.js' }))
        .pipe( $.uglify( config.scripts.minify.uglify ) )
        .pipe( $.sourcemaps.write( './' ) )
        .pipe( gulp.dest( config.scripts.destDist ) );
});

// Master script task; lint -> bundle -> minify
gulp.task( 'scripts', [ 'scripts-cleanup', 'scripts-bundle' ]);

gulp.task( 'scripts-dist', [
    'scripts-cleanup-dist',
    'scripts-minify-dist'
]);
