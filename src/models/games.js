const database = require('../db/db')
const Sequelize = require('sequelize')

const games = database.define('games',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    nome:{
        type: Sequelize.STRING,
        allowNull: true
    },
    imagem:{
        type: Sequelize.STRING,   
        allowNull: true
    },
    idade:{
        type: Sequelize.INTEGER,   
        allowNull: true
    },
    pago:{
        type: Sequelize.STRING,   
        allowNull: true
    },
    preco:{
        type: Sequelize.STRING,   
        allowNull: true
    },
    descricao:{
        type: Sequelize.STRING(5000),   
        allowNull: true
    },
    pc_req:{
        type: Sequelize.STRING(5000),   
        allowNull: true
    },
    categories:{
        type: Sequelize.STRING(1000),   
        allowNull: true
    },
    genero:{
        type: Sequelize.STRING(1000),   
        allowNull: true
    },

})

module.exports = games