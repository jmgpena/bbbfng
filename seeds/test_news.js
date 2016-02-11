
exports.seed = function(knex, Promise) {
    return Promise.join(
        // Deletes ALL existing entries
        knex('news').del(),

        // Inserts seed entries
        //knex('news').insert({id: 1, colName: 'rowValue'}),
        knex('news').insert({title: 'Noticia 1', body: 'Corpo da noticia 1.', date: '2016-02-09'}),
        knex('news').insert({title: 'Noticia 2', body: 'Corpo da noticia 2.', date: '2016-02-09'}),
        knex('news').insert({title: 'Noticia 3', body: 'Corpo da noticia 3.', date: '2016-02-09'}),
        knex('news').insert({title: 'Noticia 4', body: 'Corpo da noticia 4.', date: '2016-02-09'})
    );
};
