const database = require('../db/db')
const Sequelize = require('sequelize')
const sequelize = require('../db/db')

const User = database.define('user', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome:{
        type: Sequelize.STRING,
        allowNull: true
    },
    email:{
        type: Sequelize.STRING,
        allowNull: true
    },
    senha:{
        type: Sequelize.STRING,
        allowNull: true
    },
    idade:{
        type: Sequelize.DATE,
        allowNull: true

    },
    tipo:{
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 'user'
    },
})

module.exports = User