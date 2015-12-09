// app.js

var path = require('path');
var express = require('express');
var cookieParser = require('cookie-parser');
var i18n = require('i18n');
var app = express();

i18n.configure({
    locales: ['pt', 'en', 'es'],
    cookie: 'locale',
    defaultLocale: 'pt',
    directory: __dirname + '/locales'
});
//i18n.expressBind(app, {
    //    locales: ['pt', 'en', 'es'],
    //    defaultLocale: 'pt',
    //    cookieName: 'locale'
//});
app.set('view engine', 'jade');
// localization
app.use(cookieParser());
app.use(express.static('public'));
app.use(i18n.init);
//app.use(function (req, res, next) {
//    req.i18n.setLocaleFromQuery();
//    req.i18n.setLocaleFromCookie();
//    next();
//});
app.use(require('easy-livereload')({
    watchDirs: [
        path.join(__dirname, 'public'),
        path.join(__dirname, 'views')
    ]
}));

app.get('/', function (req, res) {
    res.cookie('locale', 'pt');
    res.render('index', { pageTitle: 'BBBF2016', message: res.__("Mensagem") });
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('bbbfng listening at http://%s:%s', host, port);
});
