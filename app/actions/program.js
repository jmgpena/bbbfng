'use strict';
const bands = require('../domain/bands.js');

module.exports = function(request, reply) {
    const locale = request.locale;
    const bandList = bands.all(locale)
    reply.view('program', {
        bands: bandList
    });
};
