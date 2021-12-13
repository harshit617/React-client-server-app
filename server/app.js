const express = require('express');
const path = require('path');
const bodyParser=require('body-parser');
const {body} =require('express-validator/check');
const sequelize=require('./util/database');
const authRoutes=require('./routes/auth');
const User=require('./model/user');

const app = express();

app.use(bodyParser.json());

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','OPTIONS,GET,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
next();

});

app.use('/auth',authRoutes);

sequelize
//.sync()
.sync({force:true})
.then(result=>{
    app.listen(8000);
})
.catch(err=>{
    console.log(err);
});

app.use((error,req,res,next)=>{
    console.log(error);
    const  status=error.statusCode ||500;
    const message=error.message;
    const data=error.data;
    res.status(status).json({message:message,data:data})
    });
    

