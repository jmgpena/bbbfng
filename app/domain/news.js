'use strict';
const db = require('../db.js');
const _  = require('lodash');

module.exports = {
    home: (locale) => {
        return db.select().from('news').limit(3)
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

                    return newsItem;
                });
            })
            .catch((error) => { console.log(error); });
    }
};
