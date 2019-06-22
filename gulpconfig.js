// ==== CONFIGURATION ==== //

// Project paths
var devConfig = require( './devConfig' ),
    src = './src/' + devConfig.activeProject + '/',
    dist = './dist/' + devConfig.activeProject + '/',
    build = './public_html/',
    modules = './node_modules/';

var projects = {
    'alquiler-herramientas': {
        html: {
            urls: {
                prod:
                    devConfig.activeProject + '/'
            }
        },
        fonts: [
            modules + 'slick-carousel/slick/fonts/slick.eot',
            modules + 'slick-carousel/slick/fonts/slick.ttf',
            modules + 'slick-carousel/slick/fonts/slick.svg',
            modules + 'slick-carousel/slick/fonts/slick.woff',
            modules + 'font-awesome/fonts/**/*'
        ],
        images: []
    }
};

// Project settings
module.exports = {
    urls: {
        prod: projects[devConfig.activeProject].html.urls.prod
    },
    html: {
        src: [ src + '**/*.html', src + '**/*.shtml' ],
        dest: build,
        destDist: dist
    },
    styles: {
        src: [ src + 'assets/scss/**/*.scss' ],
        dest: build + 'assets/css/',
        destDist: dist + 'assets/css/',
        autoprefixer: {
            browsers: [ '> 3%', 'last 2 versions', 'ie 9', 'ios 6', 'android 4' ]
        },
        minify: { safe: true },
        sass: {
            includePaths: [ src + 'assets/scss/**/*.scss', modules ],
            precision: 6,
            onError: function( err ) {
                return console.log( err );
            }
        }
    },
    scripts: {
        bundles: {
            core: [ 'core' ],
            plugins: [ 'plugins' ],
            initial: [ 'initial' ]
        },
        chunks: {
            core: [
                src + 'assets/js/carousel.js',
                src + 'assets/js/initial.js',
                src + 'assets/js/mappost.js',
                src + 'assets/js/mapselect.js',
                src + 'assets/js/menu.js',
                src + 'assets/js/utils.js'

            ],
            initial: [
                src + 'assets/js/maptiendas.js'

            ],
            plugins: [
                modules + 'slick-carousel/slick/slick.min.js',
                modules + 'cookie/index.js'
            ]
        },
        dest: build + 'assets/js/',
        destDist: dist + 'assets/js/',
        lint: {
            src: [ src + 'assets/js/**/*.js' ]
        },
        minify: {
            src: dist + 'assets/js/**/*.js',
            uglify: {},
            uglifyDist: {
                compress: {
                    dropConsole: true
                }
            },
            dest: build + 'assets/js/',
            destDist: dist + 'assets/js/'
        }
    },
    images: {
        src: [
            src + 'assets/img/**/*(*.png|*.jpg|*.jpeg|*.gif|*.svg|*.ico)'
        ].concat( projects[devConfig.activeProject].images ),
        dest: build + 'assets/img/',
        destDist: dist + 'assets/img/',
        imagemin: {
            optimizationLevel: 7,
            progressive: true,
            interlaced: true
        }
    },
    fonts: {
        src: [ src + 'assets/fonts/**/*' ].concat(
            projects[devConfig.activeProject].fonts
        ),
        dest: build + 'assets/fonts/',
        destDist: dist + 'assets/fonts/'
    },
    browsersync: {
        server: {
            baseDir: build,
            directory: false
        },
        files: [ src ],
        notify: true,
        open: true,
        port: 3030
    },
    utils: {
        clean: [ build + '**/.DS_Store' ],
        wipe: [ dist ],
        dist: {
            src: [ build + '**/*', '!' + build + '**/*.map' ],
            dest: dist
        }
    }
};
