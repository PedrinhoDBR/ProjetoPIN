const database = require('../db/db')
const Sequelize = require('sequelize')

const gpu = database.define('gpu',{
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
    vram:{
        type: Sequelize.INTEGER,   
        allowNull: true
    },
    frequencia:{
        type: Sequelize.STRING,   
        allowNull: true
    },
    directx:{
        type: Sequelize.INTEGER,   
        allowNull: true
    },
    ordem:{
        type: Sequelize.STRING,   
        allowNull: true
    }
})

module.exports = gpu