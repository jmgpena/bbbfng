// Update with your config settings.

module.exports = {
    bbbf: {
        client: 'sqlite3',
        useNullAsDefault: true,
        connection: {
            filename: './bbbf.sqlite3'
        },
        pool: {
            min: 2,
            max: 10
        },
    }
};
