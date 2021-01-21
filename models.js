const Sequelize = require('sequelize')
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db.sqlite',
    logging: false // default true , console.log
})

const User = sequelize.define('User', {
    name: {
        type: Sequelize.DataTypes.STRING,
        unique : true
    }
});

module.exports = {Sequelize, sequelize, User}