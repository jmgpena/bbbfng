'use strict';
const db = require('../db.js');
const _  = require('lodash');
const md = require('markdown-it')({
    html: true,
    typographer: true
});

module.exports = {
    home: (locale) => {
        const rows = db.prepare('SELECT * FROM news ORDER BY date DESC LIMIT 3').all();
        return _.map(rows, (row) => {
            let newsItem = {};

            newsItem.title = _.truncate(row['title_'+locale] || row['title_pt'], {
                'length': 80,
                'separator': ' '
            });
            newsItem.body   = _.truncate(row['body_'+locale] || row['body_pt'], {
                'length': 100,
                'separator': /,? +/
            });
            newsItem.body = md.render(newsItem.body);
            newsItem.pic   = row['pic'];
            newsItem.id    = row['id'];

            return newsItem;
        });
    },
    item: (id, locale) => {
        const row = db.prepare('SELECT * FROM news WHERE id = ?').get(id);
        let item = {};

        item = row;
        item.title  = row['title_'+locale] || row['title_pt'];
        item.body  = row['body_'+locale] || row['body_pt'];
        item.pic = row['pic'];

        item.body = md.render(item.body);

        return item;
    }
};
