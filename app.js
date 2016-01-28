/* globals module require */
'use strict';

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

/* serve static files on development */
server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: 'public'
        }
    }
});

server.route({
    method: 'GET',
    path: '/cartaz',
    handler: function (request, reply) {
        reply.view('index-cartaz');
    }
});

module.exports = server;
