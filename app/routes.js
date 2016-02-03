'use strict';

module.exports = [
    { method: 'GET', path: '/', handler: require('./actions/home.js') },
    // serve static files (should only apply on development)
    { method: 'GET', path: '/{param*}',
        handler: {
            directory: {
                path: 'public'
            }
        }
    },
    { method: 'GET', path: '/cartaz', handler: require('./actions/cartaz.js') }
];
