const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Fish extends Model {}

Fish.init({
    // add properites here, ex:
    name: {
         type: DataTypes.STRING,
         allowNull:false
    },
    color: {
         type: DataTypes.STRING,
         allowNull:false
    },
    width: {
         type: DataTypes.INTEGER,
        validate:{
            min:1
        }
    },
},{
    sequelize
});

module.exports=Fish