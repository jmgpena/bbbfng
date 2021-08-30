'use strict';
const db = require('../db.js');
const _  = require('lodash');
const md = require('markdown-it')({
    html: true,
    typographer: true
});

module.exports = {
    all: (locale) => {
        const rows = db.prepare('SELECT * FROM bands ORDER by id').all();
        return _.map(rows, (row) => {
            let bandItem = {};

            //bandItem.name = row['name_'+locale] || row['name'];
            bandItem.name = row['name_'+locale] || row['name'];
            bandItem.date = row['date_'+locale] || row['date'];
            bandItem.venue = row['venue_'+locale] || row['venue'];
            bandItem.info = row['info_'+locale] || row['info'];
            bandItem.info = md.render(bandItem.info);
            bandItem.time  = row['time'];
            bandItem.pic  = row['pic'];
            bandItem.banner  = row['banner'];
            bandItem.slug = row['slug'];
            bandItem.free = row['free'] == 1;
            bandItem.dia = row['dia'];

            return bandItem;
        });
    },
    band: (slug, locale) => {
        try {
            const row = db.prepare('SELECT * FROM bands WHERE slug = ?').get(slug);

            let band = {};

            if (row) {
                band = row;
                band.name  = row['name_'+locale] || row['name'];
                band.info  = row['info_'+locale] || row['info'];
                band.local = row['local_'+locale] || row['local'];
            }

            return band;
        } catch (error) {
            console.log('error jorge');
            console.log(error);
        }
    }
};
