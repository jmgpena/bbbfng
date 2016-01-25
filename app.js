// app.js

var path = require('path');
var hapi = require('hapi');
//var cookieParser = require('cookie-parser');
//var i18n = require('i18n');
var server = new hapi.Server();

server.connection({
    host: 'localhost',
    port: 3000
});

server.register(require('vision'), (err) => {
    if (err) {
        throw err;
    }
    server.views({
        engines: { jade: require('jade')},
        path: __dirname + '/views',
        isCached: false,
        compileOptions: {
            pretty: false
        }
    });
});

server.register([
    {
        register: require('inert')
    }
], (err) => {
    if (err) {
        console.error('Failed to load a plugin:', err);
    }
});

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply.view('index');
    }
});

server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: 'public'
        }
    }
});

server.start(() => {
    console.log('Server runnint at:', server.info.uri);
});

module.exports = server;

//var env = 'Unknown';

// i18n.configure({
//   locales: ['pt', 'en', 'es'],
//   cookie: 'lang',
//   defaultLocale: 'pt',
//   directory: __dirname + '/locales'
// });
// app.set('view engine', 'jade');
// // localization
// app.use(cookieParser());
// app.use(express.static('public'));
// app.use(i18n.init);

// app.get('/', function (req, res) {
//     if (req.query.lang) {
//         req.setLocale(req.query.lang);
//         res.cookie('lang', req.query.lang);
//     }
//     res.render('index', { pageTitle: 'BBBF2016', message: res.__('Mensagem'), env: app.get('env') });
// });

// app.get('/cartaz', function (req, res) {
//     res.render('index-cartaz');
// });


// var server = app.listen(3000, function () {
//     var host = server.address().address;
//     var port = server.address().port;

//     console.log('bbbfng listening at http://%s:%s', host, port);
// });
