'use strict';
// __: request.i18n.__,
module.exports = function(request, reply) {
    reply.view('index', {
        message: request.i18n.__("Mensagem")
    });
};
