const Sequelize = require('sequelize')

const sequelize = new Sequelize('projetopin','root','1234',
    {
    host: 'localhost',
    dialect: 'mysql'
    }
);

// const sequelize = new Sequelize('bwwgtapwu7ld6b2pmfce','uyljbougwprsnhbn','zygT7eoW1GzWNuXyOJL4',
//     {
//     host: 'bwwgtapwu7ld6b2pmfce-mysql.services.clever-cloud.com',
//     dialect: 'mysql',
//     port:3306
//     }
// );

module.exports = sequelize