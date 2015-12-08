// app.js

var path = require('path');
var express = require('express');
var app = express();

app.set('view engine', 'jade');
app.use(express.static('public'));
app.use(require('easy-livereload')({
    watchDirs: [
        path.join(__dirname, 'public'),
        path.join(__dirname, 'views')
    ]
}));

app.get('/', function (req, res) {
    res.render('index', { pageTitle: 'BBBF2016', message: "Message" });
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('bbbfng listening at http://%s:%s', host, port);
});
