require('dotenv').config()
const knex = require('knex');

const knexConfig = require('../knexfile');


const envir = process.env.DATABASE_URL || 'production' 
module.exports = knex(knexConfig[envir]);