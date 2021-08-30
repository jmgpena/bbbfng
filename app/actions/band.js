'use strict';
const bands = require('../domain/bands.js');

module.exports = function(request, reply) {
    const locale = request.locale;
    const slug = request.params.slug;

    const band = bands.band(slug, locale);

    console.log(band);

    if ( !band || band == {} ) {
        reply.view('404').code(404);
    } else {
        reply.view('band', {
            band: band
        });
    }
};
