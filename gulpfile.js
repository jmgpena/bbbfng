var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var pm2 = require('pm2');

var pm2Exec = function (action, data) {
    pm2.connect(function(err) {
        var disconnectCb = function(err, apps) {
            console.log('disconnecting...');
            pm2.disconnect();
        };

        if (err) {
            console.error(err);
            process.exit(2);
        }


        switch (action) {
        case 'start':
            console.log('Starting process');
            pm2.start(data, disconnectCb);
            break;
        case 'reload':
            pm2.gracefulReload(data, disconnectCb);
            break;
        }
    });
};

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
    var server = require('./app.js');
    server.start(function() {
        callback();
    });
});

gulp.task('server:reload', (callback) => {
    var server = require('./app.js');
    server.stop(() => {
        server.start(() => {
            callback();
            browserSync.reload();
        });
    });
});

gulp.task('server:stop', function (callback) {
    var server = require('./app.js');
    server.stop(function() {
        process.exit(0);
        callback();
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
    gulp.watch(['app.js'], ['server:reload']);
});

gulp.task('pm2-start', function() {
    pm2Exec('start', {
        name: 'bbbfng',
        script: 'apps.js'
    });
});

gulp.task('pm2-reload', function() {
    pm2Exec('reload', 'bbbfng');
});

gulp.task('dev-css', function() {
    buildCss().pipe(browserSync.stream({match: '**/*.css'}));
});

gulp.task('css', buildCss);

gulp.task('default', ['development']);
gulp.task('build', ['css']);
