'use strict';
const news = require('../domain/news.js');
const bands = require('../domain/bands.js');

module.exports = function(request, reply) {
    const locale = request.locale;
    Promise.all([news.home(locale), bands.all(locale)]).then((values) => {
        const homeNews = values[0];
        const homeBands = values[1];
        reply.view('index', {
            message: request.i18n.__("Mensagem"),
            news: homeNews,
            header: homeBands
        });
    });
};
