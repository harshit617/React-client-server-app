const Sequelize=require('sequelize');
const sequelize=require('../util/database');

const User=sequelize.define('user',{

    email:
    {
        type:Sequelize.STRING,
        required:true
    } ,
    password:
    {
        type:Sequelize.STRING,
        required:true
    } ,
    dob:{
        type:Sequelize.DATE,
        required:true
    },
    username:{
        type:Sequelize.STRING,
        required:true
    },
    description:{
        type:Sequelize.STRING,
        default:"I am New!!"
    }
})
module.exports=User;