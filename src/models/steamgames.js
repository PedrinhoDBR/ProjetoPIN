const database = require('../db/db')
const Sequelize = require('sequelize')

const steamgames = database.define('steamgames',{
    appid:{
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    name:{
        type: Sequelize.TEXT,
        allowNull: true
    },
    release_date:{
        type: Sequelize.TEXT,   
        allowNull: true
    },
    developer:{
        type: Sequelize.TEXT,   
        allowNull: true
    },
    publisher:{
        type: Sequelize.TEXT,   
        allowNull: true
    },
    platforms:{
        type: Sequelize.TEXT,   
        allowNull: true
    },
    required_age:{
        type: Sequelize.INTEGER,   
        allowNull: true
    },
    categories:{
        type: Sequelize.TEXT,   
        allowNull: true
    },
    genres:{
        type: Sequelize.TEXT,   
        allowNull: true
    },
    steamspy_tags:{
        type: Sequelize.TEXT,   
        allowNull: true
    },
    price:{
        type: Sequelize.DOUBLE,   
        allowNull: true
    },
    header_image:{
        type: Sequelize.TEXT,
        allowNull: true
    },
    screenshots:{
        type: Sequelize.TEXT,   
        allowNull: true
    },
    background:{
        type: Sequelize.TEXT,   
        allowNull: true
    },
    movies:{
        type: Sequelize.TEXT,   
        allowNull: true
    },
    detailed_description:{
        type: Sequelize.TEXT,   
        allowNull: true
    },
    about_the_game:{
        type: Sequelize.TEXT,   
        allowNull: true
    },
    short_description:{
        type: Sequelize.TEXT,   
        allowNull: true
    },
    pc_requirements:{
        type: Sequelize.TEXT,   
        allowNull: true
    },
    mac_requirements:{
        type: Sequelize.TEXT,   
        allowNull: true
    },
    linux_requirements:{
        type: Sequelize.TEXT,   
        allowNull: true
    },
    minimum:{
        type: Sequelize.TEXT,   
        allowNull: true
    },
    recommended:{
        type: Sequelize.TEXT,   
        allowNull: true
    }
},{
    timestamps: false,
})

module.exports = steamgames