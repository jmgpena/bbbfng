// Update with your config settings.

module.exports = {

    development: {
        client: 'sqlite3',
        useNullAsDefault: true,
        connection: {
            filename: './dev.sqlite3'
        }
    },

    production: {
        client: 'sqlite3',
        useNullAsDefault: true,
        connection: {
            filename: './prod.sqlite3'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    }

};
