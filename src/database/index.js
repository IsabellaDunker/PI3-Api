const Sequelize = require('sequelize');
const dbConfig = require('../config/dbconfig.js');

const connection = new Sequelize(dbConfig);

module.exports = connection;