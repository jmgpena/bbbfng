'use strict';
const news = require('../domain/news.js');

module.exports = function(request, reply) {
    const locale = request.locale;
    const id = request.params.id;
    const item = news.item(id, locale);

    reply.view('news-item', {
        item: item
    });
};
