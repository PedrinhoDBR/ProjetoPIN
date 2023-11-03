const database = require('../db/db')
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
},{
    timestamps: false,
})

module.exports = favorito