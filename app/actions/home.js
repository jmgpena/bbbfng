'use strict';
const db     = require('../db.js');
// __: request.i18n.__,
module.exports = function(request, reply) {
    let news;
    db.select('title', 'body', 'pic').from('news').limit(3)
        .then((rows) => {
            console.log(rows);
            reply.view('index', {
                message: request.i18n.__("Mensagem"),
                news: rows,
                header: rows[0]
            });
        })
        .catch((error) => { console.log(error); });
};
