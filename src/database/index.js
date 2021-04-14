const Sequelize = require('sequelize');
const dbConfig = require('../config/database.js');

const User = require('../models/User');
const Environment = require('../models/Environment');
const Product = require('../models/Product');
const Order = require('../models/Order');
const ProductsOrdered = require('../models/ProductsOrdered');

const connection = new Sequelize(dbConfig);

User.init(connection);
Environment.init(connection);
Product.init(connection);
Order.init(connection);
ProductsOrdered.init(connection);

Environment.associate(connection.models);
Product.associate(connection.models);
Order.associate(connection.models);
Environment.associate({ Product });
Product.associate({ Environment });

module.exports = connection;