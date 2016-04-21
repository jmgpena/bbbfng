'use strict';
const db = require('../db.js');
const _  = require('lodash');

module.exports = {
    all: (locale) => {
        return db.select().from('bands')
            .then((rows) => {
                return _.map(rows, (row) => {
                    let bandItem = {};

                    bandItem.name = row['name_'+locale] || row['name'];
                    bandItem.picture  = row['picture'];
                    bandItem.slug = row['slug'];

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

                return band;
            })
            .catch((error) => { console.log(error); });
    }
};
