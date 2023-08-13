const database = require('../db')
const Sequelize = require('sequelize')

const cpu = database.define('Computer',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    UsuarioID:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    CPUID:{
        type: Sequelize.INTEGER,   
        allowNull: false
    },
    GPUID:{
        type: Sequelize.INTEGER,   
        allowNull: false
    },
    RAM:{
        type: Sequelize.INTEGER,   
        allowNull: false
    },
    Armazenamento:{
        type: Sequelize.INTEGER,   
        allowNull: false
    }
})

module.exports = cpu