
exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.createTable('news', function (table) {
            table.increments('id').primary();
            table.string('title');
            table.string('body');
            table.dateTime('date');
            table.timestamps();
        })
    ]);
};

exports.down = function (knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('news')
    ]);
};
