const database = require('../db')
const Sequelize = require('sequelize')
const sequelize = require('../db')

const User = database.define('user', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    senha:{
        type: Sequelize.STRING,
        allowNull: false
    },
    idade:{
        type: Sequelize.INTEGER,
        allowNull: false

    },
    tipo:{
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'user'
    },
})

module.exports = User