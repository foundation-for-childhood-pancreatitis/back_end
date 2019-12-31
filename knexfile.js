// Update with your config settings.
require('dotenv')
module.exports = {

  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    ssl:true,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: "./data/migrations",
      tableName: "knex_migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }

  },
  staging: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    ssl:true,
   
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    ssl:true,
  
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
