const {DataTypes} = require('sequelize');
const sequelize = require("../db");
const MainItems = require('./MainItems');


const SubItems = sequelize.define('SubItems',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    mainItemId:{
        type: DataTypes.INTEGER,
    references: {
      model: MainItems,
      key: 'id'
    },
    allowNull: false
    }
}, {
    timestamps:true
});

// Relationship
MainItems.hasMany(SubItems, { foreignKey: 'mainItemId', onDelete: 'CASCADE' });
SubItems.belongsTo(MainItems, { foreignKey: 'mainItemId' });

module.exports = SubItems;