const {validationResult}=require('express-validator/check');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const User=require("../model/user");

exports.getSignup = (req,res,next) => {
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        const error=new Error("validation failed");
        error.statusCode=422;
        error.data=errors.array();
        throw error;
        }

    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const description = req.body.description;
    const dob = req.body.dob;

    bcrypt
    .hash(password,12)
    .then(hashedPw=> {
        const user = new User({
            email:email,
            password:hashedPw,
            username:username,
            description:description,
            dob:dob
        });
        return user.save();
    }).then(result => {
        res.status(201).json({message: "User Signup Successful", userId: result.id});
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    });
};

exports.login = (req,res,next) => {
    const email = req.body.email;
    const password=req.body.password;
    let loadedUser;

    User.findOne({where: {email:email}})
    .then(user =>{
        if(!user){
            const error = new Error("A user with this email is not found");
            error.statusCode=401;
            throw error;
        }
        loadedUser = user;
        return bcrypt.compare(password,user.password);
    })
    .then(isEqual => {
        if(!isEqual){
            const error = new Error(" Wrong password check again");
            error.statusCode=401;
            throw error;
        }
        const token=jwt.sign({
            email:loadedUser.email,
            userId:loadedUser.id.toString()
        },
        'thisisthesecretkey',
        {expiresIn:'1h'}
        );
        res.status(200).json({token:token, id:loadedUser.id.toString()});
    })
    .catch(err=> {
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    })
};

exports.check = (req,res,next) => {
    const id = req.params.id;
    console.log(id);
    User.findByPk(id)
    .then(user=>{
        if(!user){
            const error = new Error("could not find user");
            throw error;
        }
        res.status(200).json({user:user, message:'user fetched'})
    }).catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    })
   
};

exports.update = (req,res,next) => {
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        const error=new Error("validation failed");
        error.statusCode=422;
        error.data=errors.array();
        throw error;
        }
    const id = req.params.id;
    const username = req.body.username;
    const password = req.body.password;
    const description = req.body.description;
    console.log(id);
    
    User.findByPk(id)
    .then(user=>{
        if(!user){
            const error = new Error("could not find user");
            throw error;
        }
        return User.update({
            username:username,
            description:description
        },
        {where: {id:id}}
        )
    })


    
    .then(result=>{
        res.status(200).json({message:"User updated"})
    })
    
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    })
   
};

exports.delete = (req,res,next) => {
    const id = req.params.id;
    User.findByPk(id)
    .then(user=>{
        if(!user){
            const error = new Error("could not find user");
            throw error;
        }
        User.destroy({where: {id:id}});
    })
    .then(result=>{
        res.status(200).json({message:"User deleted"})
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    })
   
};

exports.fetch = (req,res,next) => {
    
    User.findAll()
    .then(users=>{
        res.status(200).json({message:'Fetched posts succesfully',users:users})
    }).catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    })
   
};