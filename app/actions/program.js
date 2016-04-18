'use strict';
const bands = require('../domain/bands.js');

module.exports = function(request, reply) {
    const locale = request.locale;
    bands.all(locale).then((bandList) => {
        reply.view('program', {
            bands: bandList
        });
    });
};
