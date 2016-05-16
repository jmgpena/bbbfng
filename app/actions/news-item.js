'use strict';
const news = require('../domain/news.js');

module.exports = function(request, reply) {
    const locale = request.locale;
    const id = request.params.id;

    news.item(id, locale).then((item) => {
        reply.view('news-item', {
            item: item
        });
    });
};
