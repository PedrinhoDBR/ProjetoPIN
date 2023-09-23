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
    preco:{
        type: Sequelize.STRING,   
        allowNull: true
    },
    descricao:{
        type: Sequelize.STRING(5000),   
        allowNull: false
    },
    pc_req:{
        type: Sequelize.STRING(5000),   
        allowNull: false
    },
    categories:{
        type: Sequelize.STRING(1000),   
        allowNull: false
    },
    genero:{
        type: Sequelize.STRING(1000),   
        allowNull: false
    },

})

module.exports = games