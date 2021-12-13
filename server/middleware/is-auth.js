const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    const authHeader=req.get('Authorization');
    if(!authHeader){
        const error = new Error("Not Authenticated");
        error.statusCode=401;
        throw error;
    }
    const token=authHeader.split(' ')[1];
    console.log(":::>>>Token is : >>",token);
    let decodedToken;
    try{
        decodedToken=jwt.verify(token,'thisisthesecretkey');
    }
    catch(err){
        err.statusCode=500;
        err.message='not valid token';
        throw err;
    }
    if(!decodedToken){
        const err = new Error('User not authenticated');
        error.statusCode=401;
        throw error;
    }
    req.userId=decodedToken.userId;
    console.log(req.id);
    next();
};