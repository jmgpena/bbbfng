const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const pm2 = require('pm2');

// stop pm2 app on exiting gulp
process.stdin.resume();
process.on('SIGINT', () => {
    console.log('exit:stopping server...');
    pm2.connect((err) => {
        if (err) {
            console.error(err);
            process.exit(2);
        }
        pm2.delete('bbbf-dev',() => {
            process.exit(2);
        });
    });
});

// build the css
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

    pm2.connect((err) => {
        if (err) {
            console.error(err);
            process.exit(2);
        }
        pm2.start({
            name: 'bbbf-dev',
            script: 'app.js',
            watch: true,
            ignore_watch: ['node_modules', 'css', 'public', 'gulpfile.js', 'flycheck*', '.#*', '.git']
        }, (err, apps) => {
            pm2.disconnect();
        });
        pm2.launchBus((err, bus) => {
            bus.on('server:started', () => {
                console.log('[hapijs]: server started');
                browserSync.reload();
            });
        });
    });
    gulp.watch('css/**/*.css', ['dev-css']);
});

gulp.task('dev-css', function() {
    buildCss().pipe(browserSync.stream({match: '**/*.css'}));
});

gulp.task('css', buildCss);

gulp.task('default', ['development']);
gulp.task('build', ['css'], () => {
    process.exit(0);
});
