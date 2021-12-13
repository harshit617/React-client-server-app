const express=require('express');
const {body} =require('express-validator/check');
const User=require('../model/user');
const router=express.Router();
const authController =require('../controllers/auth');
const isAuth=require('../middleware/is-auth');

router.put('/signup', [
    body('email').isEmail()
    .withMessage('please enter a valid email')
    .custom((value,{req}) => {
        return User.findOne({where: {email:value}})
            .then(userDoc => {
                if(userDoc){
                return Promise.reject('email is forbidden');    }
            });
    })
    .normalizeEmail(),
    body('password').trim().isLength({min:5}),
    body('username').trim().isLength({min:5})
], authController.getSignup);


router.post('/login',authController.login);

router.get('/check/:id',isAuth,authController.check);


router.put('/update/:id',[
    body('email').isEmail()
    .withMessage('please enter a valid email')
    .normalizeEmail(),
    body('password').trim().isLength({min:5}),
    body('username').trim().isLength({min:5})
],isAuth,authController.update);

router.delete('/delete/:id',isAuth,authController.delete);

router.get('/fetchall',authController.fetch);

module.exports=router;