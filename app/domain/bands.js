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

                    return bandItem;
                });
            })
            .catch((error) => { console.log(error); });
    }
};
