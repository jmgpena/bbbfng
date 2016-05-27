'use strict';
const db = require('../db.js');
const _  = require('lodash');
const md = require('markdown-it')({
    html: true,
    typographer: true
});

module.exports = {
    all: (locale) => {
        return db.select().from('bands').orderByRaw('dia, time ASC')
            .then((rows) => {
                return _.map(rows, (row) => {
                    let bandItem = {};

                    bandItem.name = row['name_'+locale] || row['name'];
                    bandItem.date = row['date_'+locale] || row['date'];
                    bandItem.venue = row['venue_'+locale] || row['venue'];
                    bandItem.time  = row['time'];
                    bandItem.pic  = row['pic'];
                    bandItem.banner  = row['banner'];
                    bandItem.slug = row['slug'];
                    bandItem.info = md.render(row['info']);
                    console.log(bandItem.info);

                    return bandItem;
                });
            })
            .catch((error) => { console.log(error); });
    },
    band: (slug, locale) => {
        return db.select().from('bands').where({ slug: slug })
            .then((row) => {
                let band = {};

                band = row[0];
                band.name  = row[0]['name_'+locale] || row[0]['name'];
                band.info  = row[0]['info_'+locale] || row[0]['info'];
                band.local = row[0]['local_'+locale] || row[0]['local'];

                return band;
            })
            .catch((error) => { console.log(error); });
    }
};
