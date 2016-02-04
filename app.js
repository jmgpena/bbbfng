/* globals module require */
'use strict';

const path   = require('path');
const hapi   = require('hapi');
const routes = require('./app/routes.js');
//var cookieParser = require('cookie-parser');
//var i18n = require('i18n');
const server = new hapi.Server();

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


// add routes to server
routes.map((route) => {
    server.route(route);
});

// start server and send message to parent2
server.start(() => {
    console.log('Server running at:', server.info.uri);
    process.send({
        type: 'server:started',
        data: {}
    });
});
