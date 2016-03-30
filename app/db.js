'use strict';

const config = require('../knexfile.js');
const knex = require('knex')(config['bbbf']);

module.exports = knex;

