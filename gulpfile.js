var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var server = require('./app.js');

var buildCss = function() {
    var postcss    = require('gulp-postcss');
    var sourcemaps = require('gulp-sourcemaps');
    var processors = [
        require('postcss-import'),
        require('postcss-url'),
        require('postcss-cssnext'),
        require('postcss-browser-reporter'),
        require('postcss-reporter')
    ];
    return gulp.src('css/**/*.css')
        .pipe(sourcemaps.init())
        .pipe(postcss(processors))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('public/stylesheets'));
};

gulp.task('server:start', function (callback) {
    server.start(function() {
        callback();
    });
});

gulp.task('server:reload', (callback) => {
    server.stop(() => {
        delete require.cache[require.resolve('./app.js')];
        server = require('./app.js');
        server.start(() => {
            callback();
            browserSync.reload();
        });
    });
});

gulp.task('development', ['server:start', 'css'], function() {
    browserSync.init(null, {
        proxy: {
            target: 'http://localhost:3000',
        },
        files: ['views/*.jade'],
        port: 7000
    });

    gulp.watch('css/**/*.css', ['dev-css']);
    gulp.watch(['app.js', 'app/**/*.js'], ['server:reload']);
});

gulp.task('dev-css', function() {
    buildCss().pipe(browserSync.stream({match: '**/*.css'}));
});

gulp.task('css', buildCss);

gulp.task('default', ['development']);
gulp.task('build', ['css']);
