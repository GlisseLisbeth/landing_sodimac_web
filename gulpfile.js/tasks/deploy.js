var gulp = require( 'gulp' ),
    deploy = require( 'gulp-gh-pages' );

gulp.task( 'deploy', function() {
    return gulp.src( './public_html/**/*' ).pipe(
        deploy({
            remoteUrl:
                'https://github.com/GlisseLisbeth/landing_sodimac_web.git',
            branch: 'master'
        })
    );
});
