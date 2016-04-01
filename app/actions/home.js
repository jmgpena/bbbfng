'use strict';
const news = require('../domain/news.js');

module.exports = function(request, reply) {
    const locale = request.locale;
    news.home(locale).then((homeNews) => {
        reply.view('index', {
            message: request.i18n.__("Mensagem"),
            news: homeNews,
            header: homeNews[0]
        });
    });
};
