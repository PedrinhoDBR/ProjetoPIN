const database = require('../db')
const Sequelize = require('sequelize')

const cpu = database.define('Computer',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    UsuarioID:{
        type: Sequelize.INTEGER,
        allowNull: true
    },
    CPUID:{
        type: Sequelize.INTEGER,   
        allowNull: true
    },
    GPUID:{
        type: Sequelize.INTEGER,   
        allowNull: true
    },
    RAM:{
        type: Sequelize.INTEGER,   
        allowNull: true
    },
    Armazenamento:{
        type: Sequelize.INTEGER,   
        allowNull: true
    }
})

module.exports = cpu