
const {DataTypes} = require('sequelize');
const sequelize = require('../db');

const MainItems = sequelize.define('MainItems', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = MainItems;
