const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const pm2 = require('pm2');
const postcss    = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');

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


function css() {
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

function dev_css() {
  css().pipe(browserSync.stream({match: '**/*.css'}));
};

function pm2_dev(done) {
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
      error_file: 'log/error.log',
      out_file: 'log/out.log',
      watch: ['app.js', 'app'],
      env: {
        NODE_ENV: 'development'
      }
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
  gulp.watch('css/**/*.css', dev-css);
};

function exit(done) {
    done();
    process.exit(0);
}

var build = gulp.series(css,exit);
var dev = gulp.series(css, pm2_dev);

exports.css = css;
exports.build = build;
exports.dev = dev;
exports.default = dev;
