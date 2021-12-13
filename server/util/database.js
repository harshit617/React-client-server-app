const Sequelize = require('sequelize');
const sequelize = new Sequelize('server', 'root','cogni', {
    dialect: 'mysql',
    host:'localhost'
}); 

module.exports=sequelize;