const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('shopper', process.env.LOGIN, process.env.PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

module.exports = sequelize;