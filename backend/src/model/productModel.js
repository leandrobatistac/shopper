const { DataTypes } = require('sequelize');
const sequelize = require('../../database');

const Product = sequelize.define('Product', {
  code: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cost_price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  sales_price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'products',
  timestamps: false
});

module.exports = { Product };
