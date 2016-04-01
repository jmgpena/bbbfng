'use strict';
const db = require('../db.js');
const _  = require('lodash');

module.exports = {
    home: (locale) => {
        return db.select().from('news').limit(3)
            .then((rows) => {
                return _.map(rows, (row) => {
                    let newsItem = {};

                    newsItem.title = row['title_'+locale] || row['title_pt'];
                    newsItem.body  = row['body_'+locale] || row['body_pt'];
                    newsItem.pic   = row['pic'];

                    return newsItem;
                });
            })
            .catch((error) => { console.log(error); });
    }
};
