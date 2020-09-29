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

gulp.task('css', (done) => {
    buildCss();
    done();
});

gulp.task('development', gulp.series('css', function() {
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
  gulp.watch('css/**/*.css', ['dev-css']);
}));

gulp.task('dev-css', function() {
  buildCss().pipe(browserSync.stream({match: '**/*.css'}));
});

gulp.task('default', gulp.series('development'));
gulp.task('build', gulp.series('css', (done) => {
    done();
    process.exit(0);
}));
