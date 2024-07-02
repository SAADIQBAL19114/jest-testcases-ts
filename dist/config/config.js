"use strict";
require('dotenv').config();
module.exports = {
    development: {
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        host: process.env.HOST,
        dialect: 'postgres',
    },
    test: {
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
        database: process.env.TEST_DATABASE,
        host: process.env.HOST,
        dialect: 'postgres',
    },
    production: {
        username: process.env.USERNAME,
        password: null,
        database: 'database_production',
        host: process.env.HOST,
        dialect: 'postgres',
    },
};
