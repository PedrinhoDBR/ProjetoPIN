const database = require('../db')
const Sequelize = require('sequelize')

const games = database.define('games',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },
    imagem:{
        type: Sequelize.STRING,   
        allowNull: false
    },
    idade:{
        type: Sequelize.INTEGER,   
        allowNull: false
    },
    pago:{
        type: Sequelize.STRING,   
        allowNull: false
    },
    descricao:{
        type: Sequelize.STRING,   
        allowNull: false
    },
    pc_req:{
        type: Sequelize.STRING,   
        allowNull: false
    },
    
})

module.exports = games