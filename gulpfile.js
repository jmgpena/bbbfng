const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const nodemon = require('gulp-nodemon');

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

gulp.task('development', ['css'], function() {
    browserSync.init(null, {
        proxy: {
            target: 'http://localhost:3000',
        },
        //files: ['views/*.jade'],
        port: 7000,
        open: false
    });

    nodemon({
        script: './app.js',
        ext: 'js'
    }).on('restart', () => { setTimeout(browserSync.reload, 700); });
    gulp.watch('css/**/*.css', ['dev-css']);
});

gulp.task('dev-css', function() {
    buildCss().pipe(browserSync.stream({match: '**/*.css'}));
});

gulp.task('css', buildCss);

gulp.task('default', ['development']);
gulp.task('build', ['css']);
