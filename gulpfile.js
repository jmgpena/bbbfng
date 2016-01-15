var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var pm2 = require('pm2');

gulp.task('development', ['pm2', 'css'], function() {
    browserSync.init(null, {
        proxy: {
            target: 'http://localhost:3000',
        },
        files: ['views/*.jade'],
        port: 7000
    });

    gulp.watch('css/**/*.css', ['css']);
    //gulp.watch(['app.js', 'views/**/*.jade']).on('change', reload);
});

gulp.task('pm2', function() {
    pm2.connect(function(err) {
        if (err) {
            console.error(err);
            process.exit(2);
        }

        pm2.start({
            name: 'bbbfng',
            script: 'app.js',
            node_args: ['--harmony']
        }, function(err, apps) {
            pm2.disconnect();
        });
    });
});

gulp.task('css', function() {
    var postcss    = require('gulp-postcss');
    var sourcemaps = require('gulp-sourcemaps');
    var processors = [
        require('postcss-import'),
        require('postcss-url'),
        require('postcss-cssnext'),
        require('postcss-browser-reporter'),
        require('postcss-reporter')
    ];
    console.log('Processing CSS...');
    return gulp.src('css/**/*.css')
        .pipe(sourcemaps.init())
        .pipe(postcss(processors))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('public/stylesheets'))
        .pipe(browserSync.stream());
});

gulp.task('default', ['development'], function() {

});
