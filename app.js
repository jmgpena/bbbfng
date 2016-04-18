/* globals module require */
'use strict';

const path   = require('path');
const hapi   = require('hapi');
const routes = require('./app/routes.js');
const server = new hapi.Server({
    debug: {
        request: ['error']
    }
});

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
    path: __dirname + '/app/views',
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

server.register({
  register: require('hapi-i18n'),
  options: {
    locales: ['pt', 'en', 'es'],
    defaultLocale: 'pt',
    directory: __dirname + '/locales'
  }
}, (err) => {
  if (err) {
    console.error('Failed to load a plugin:', err);
  }
});

// add i18n translation function to all jade requests
server.ext('onPreResponse', (request, reply) => {
  const response = request.response;
  if (response.variety === 'view') {
    let context = response.source.context;
    context.__ = request.i18n.__;
  }
  return reply.continue();
});

// add routes to server
routes.map((route) => {
  server.route(route);
});

// server logging
server.on('log', (event, tags) => {
  if (tags.error) {
    console.log(event);
  }
});

// start server and send message to parent2
server.start(() => {
  console.log('Server running at:', server.info.uri);
  if ( typeof(process.send) == 'function' ) {
    process.send({
      type: 'server:started',
      data: {}
    });
  }
});
