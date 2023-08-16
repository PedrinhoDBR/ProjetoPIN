const database = require('../db')
const Sequelize = require('sequelize')

const favorito = database.define('Favorito',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    UsuarioID:{
        type: Sequelize.INTEGER,   
        allowNull: true
    },
    GameID:{
        type: Sequelize.INTEGER,   
        allowNull: true
    }
})

module.exports = favorito