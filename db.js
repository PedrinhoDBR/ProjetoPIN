const Sequelize = require('sequelize')

const sequelize = new Sequelize('sql10606809','sql10606809','KwDTBiIpUT',
    {
    host: 'sql10.freesqldatabase.com',
    dialect: 'mysql'
    }
);

module.exports = sequelize