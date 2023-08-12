const database = require('../db')
const Sequelize = require('sequelize')

const cpu = database.define('cpu',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },
    tipo:{
        type: Sequelize.STRING,   
        allowNull: false
    },
    geracao:{
        type: Sequelize.INTEGER,   
        allowNull: false
    },
    ordem:{
        type: Sequelize.STRING,   
        allowNull: false
    }
})

module.exports = cpu