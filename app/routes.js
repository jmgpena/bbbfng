'use strict';

module.exports = [
    // serve static files (should only apply on development)
    { method: 'GET', path: '/js/{p*}',
      handler: {
          directory: {
              path: 'public/js'
          }
      }
    },
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
    // bands
    { method: 'GET', path: '/programa', handler: require('./actions/program.js') },
    { method: 'GET', path: '/{languageCode}/programa', handler: require('./actions/program.js') },
    { method: 'GET', path: '/historico', handler: require('./actions/history.js') },
    { method: 'GET', path: '/{languageCode}/historico', handler: require('./actions/history.js') },
    { method: 'GET', path: '/bandas/{slug}', handler: require('./actions/band.js') },
    { method: 'GET', path: '/{languageCode}/bandas/{slug}', handler: require('./actions/band.js') },
    // news
    { method: 'GET', path: '/news/{id}', handler: require('./actions/news-item.js') },
    { method: 'GET', path: '/{languageCode}/news/{id}', handler: require('./actions/news-item.js') },
    // home
    { method: 'GET', path: '/', handler: require('./actions/home.js') },
    { method: 'GET', path: '/{languageCode}/', handler: require('./actions/home.js') },
    { method: 'GET', path: '/{languageCode}', handler: require('./actions/home.js') },
    { method: '*', path: '/{p*}', handler: require('./actions/404.js') }
];
