const database = require('../db')
const Sequelize = require('sequelize')

const cpu = database.define('cpu',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    nome:{
        type: Sequelize.STRING,
        allowNull: true
    },
    tipo:{
        type: Sequelize.STRING,   
        allowNull: true
    },
    geracao:{
        type: Sequelize.INTEGER,   
        allowNull: true
    },
    frequencia:{
        type: Sequelize.STRING,   
        allowNull: true
    },
    ordem:{
        type: Sequelize.STRING,   
        allowNull: true
    }
})

module.exports = cpu