'use strict';

module.exports = function(request, reply) {
    const locale = request.locale;
    reply.view('history');
};
