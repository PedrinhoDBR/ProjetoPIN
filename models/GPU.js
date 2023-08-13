const database = require('../db')
const Sequelize = require('sequelize')

const gpu = database.define('gpu',{
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
    vram:{
        type: Sequelize.INTEGER,   
        allowNull: false
    },
    frequencia:{
        type: Sequelize.STRING,   
        allowNull: false
    },
    directx:{
        type: Sequelize.INTEGER,   
        allowNull: false
    },
    ordem:{
        type: Sequelize.STRING,   
        allowNull: false
    }
})

module.exports = gpu