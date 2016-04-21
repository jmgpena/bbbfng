'use strict';

module.exports = [
    // bands
    { method: 'GET', path: '/programa', handler: require('./actions/program.js') },
    { method: 'GET', path: '/{languageCode}/programa', handler: require('./actions/program.js') },
    { method: 'GET', path: '/bandas/{slug}', handler: require('./actions/band.js') },
    { method: 'GET', path: '/{languageCode}/bandas/{slug}', handler: require('./actions/band.js') },
    // home
    { method: 'GET', path: '/', handler: require('./actions/home.js') },
    { method: 'GET', path: '/{languageCode}/', handler: require('./actions/home.js') },
    { method: 'GET', path: '/{languageCode}', handler: require('./actions/home.js') },
    // serve static files (should only apply on development)
    { method: 'GET', path: '/images/{p*}',
        handler: {
            directory: {
                path: 'public/images'
            }
        }
    },
    { method: 'GET', path: '/stylesheets/{p*}',
      handler: {
          directory: {
              path: 'public/stylesheets'
          }
      }
    },
    { method: '*', path: '/{p*}', handler: require('./actions/404.js') }
];
