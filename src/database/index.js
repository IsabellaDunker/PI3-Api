const Sequelize = require('sequelize');
const dbConfig = require('../config/database.js');

const User = require('../models/User');
const Environment = require('../models/Environment');
const Product = require('../models/Product');

const connection = new Sequelize(dbConfig);

User.init(connection);
Environment.init(connection);
Product.init(connection);


module.exports = connection;