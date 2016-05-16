'use strict';
const db = require('../db.js');
const _  = require('lodash');

module.exports = {
    home: (locale) => {
        return db.select().from('news').orderBy('date', 'desc').limit(3)
            .then((rows) => {
                return _.map(rows, (row) => {
                    let newsItem = {};

                    newsItem.title = _.truncate(row['title_'+locale] || row['title_pt'], {
                        'length': 38,
                        'separator': ' '
                    });
                    newsItem.body   = _.truncate(row['body_'+locale] || row['body_pt'], {
                        'length': 122,
                        'separator': /,? +/
                    });
                    newsItem.pic   = row['pic'];
                    newsItem.id    = row['id'];

                    return newsItem;
                });
            })
            .catch((error) => { console.log(error); });
    },
    item: (id, locale) => {
        return db.select().from('news').where({ id: id })
            .then((row) => {
                let item = {};

                item = row[0];
                item.title  = row[0]['title_'+locale] || row[0]['title'];
                item.body  = row[0]['body_'+locale] || row[0]['body'];
                item.pic = row[0]['pic'];

                return item;
            })
            .catch((error) => { console.log(error); });
    }
};
