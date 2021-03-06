require('dotenv').config({path: __dirname + '/../../.env'});

module.exports = {
  dialect: 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  define: {
    underscored: true,
    timestamps: false,
  }
}