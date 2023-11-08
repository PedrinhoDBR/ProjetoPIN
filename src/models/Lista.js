const database = require('../db/db')
const Sequelize = require('sequelize')

const Lista = database.define('listacpuegpu',{
    PecaID:{
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    PecaDescricao:{
        type: Sequelize.TEXT,
        allowNull: true
    },
    PecaTipo:{
        type: Sequelize.TEXT,   
        allowNull: true
    },
    PecaDataLancamento:{
        type: Sequelize.TEXT,   
        allowNull: true
    },
    PecaTamanho:{
        type: Sequelize.DOUBLE,   
        allowNull: true
    },
    PecaTDP:{
        type: Sequelize.DOUBLE,   
        allowNull: true
    },
    PecaTamanhoDois:{
        type: Sequelize.TEXT,   
        allowNull: true
    },
    PecaTransistors:{
        type: Sequelize.TEXT,   
        allowNull: true
    },
    PecaFrequencia:{
        type: Sequelize.DOUBLE,   
        allowNull: true
    },
    PecaFundador:{
        type: Sequelize.TEXT,   
        allowNull: true
    },
    PecaVendedor:{
        type: Sequelize.TEXT,   
        allowNull: true
    }

})

module.exports = Lista