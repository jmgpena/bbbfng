// app.js

var path = require('path');
var express = require('express');
var cookieParser = require('cookie-parser');
var i18n = require('i18n');
var app = express();
var env = 'Unknown';

i18n.configure({
  locales: ['pt', 'en', 'es'],
  cookie: 'lang',
  defaultLocale: 'pt',
  directory: __dirname + '/locales'
});
app.set('view engine', 'jade');
// localization
app.use(cookieParser());
app.use(express.static('public'));
app.use(i18n.init);
if (app.get('env') === 'development') {
  app.use(require('easy-livereload')({
    watchDirs: [
      path.join(__dirname, 'public'),
      path.join(__dirname, 'views')
    ]
  }));
}

app.get('/', function (req, res) {
  if (req.query.lang) {
    req.setLocale(req.query.lang);
    res.cookie('lang', req.query.lang);
  }
  res.render('index', { pageTitle: 'BBBF2016', message: res.__('Mensagem'), env: app.get('env') });
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('bbbfng listening at http://%s:%s', host, port);
});
