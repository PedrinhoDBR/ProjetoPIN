const database = require('../db/db')
const Sequelize = require('sequelize')

const auxiliargames = database.define('auxiliargames',{
    id:{
        type: Sequelize.INTEGER,
        allowNull: true,
        primaryKey: true,
    },
    Memory:{
        type: Sequelize.TEXT,
        allowNull: true
    },
    GraphicsCard:{
        type: Sequelize.TEXT,
        allowNull: true
    },
    CPU:{
        type: Sequelize.TEXT,   
        allowNull: true
    },
    FileSize:{
        type: Sequelize.TEXT,   
        allowNull: true
    },
    OS:{
        type: Sequelize.TEXT,   
        allowNull: true
    },
    name:{
        type: Sequelize.TEXT,   
        allowNull: true
    }
},{
    timestamps: false,
})

module.exports = auxiliargames