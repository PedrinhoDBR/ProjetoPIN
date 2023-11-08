const Sequelize = require('sequelize')

const sequelize = new Sequelize('projetopin','root','root123',
    {
    host: 'localhost',
    dialect: 'mysql'
    }
);


module.exports = sequelize