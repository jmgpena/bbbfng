'use strict';
const bands = require('../domain/bands.js');

module.exports = function(request, reply) {
    const locale = request.locale;
    const slug = request.params.slug;

    bands.band(slug, locale).then((band) => {
        reply.view('band', {
            band: band
        });
    });
};
