const { DataTypes } = require('sequelize');
const sequelize = require('../../database');

const Packs = sequelize.define('Packs', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  pack_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  qty: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'packs',
  timestamps: false
});

module.exports = { Packs };
