const database = require('../db')
const Sequelize = require('sequelize')

const GameRequirements = database.define('requirements',{

    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }
})