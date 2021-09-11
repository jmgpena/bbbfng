'use strict';
const news = require('../domain/news.js');
const bands = require('../domain/bands.js');

module.exports = function(request, reply) {
    const locale = request.locale;
    const homeNews = news.home(locale);
    const homeBands = bands.all(locale);
    reply.view('index', {
        message: request.i18n.__("Mensagem"),
        news: homeNews,
        bands: homeBands
    });
};
