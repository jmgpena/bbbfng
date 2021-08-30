'use strict';

const Database = require('better-sqlite3');
const db = new Database('bbbf.sqlite3');

module.exports = db;
