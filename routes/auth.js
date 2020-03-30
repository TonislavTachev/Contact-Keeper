const express = require('express');
const router = express.Router();
const {check, validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const User = require('../models/User');
//@route GET api/auth
//@desc Get logged in user
//@access Private

router.get('/',auth,async(req,res)=>{
    try{
        console.log(req.user.id);
         const user = await User.findById(req.user.id).select('-password') //because we don't want to return the password;
         res.json(user);

    } catch(error){
        console.log(error.message);
        res.status(500).json({msg: "Server Error"});
    }
})

//@route     post api/auth
//@desc      Auth user & get token
//@access    Public

router.post('/', [
 check('password', 'Please enter a password').exists(),
 check('email','Please include a valid email').isEmail()
],async(req,res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()}); //errors.array is a method that gives an array full of the errors
    }

    const {email, password} = req.body;

    try{
        //check email
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({msg: "Invalid Credentials"});
        }
       //check password
       const isMatch = await bcrypt.compare(password, user.password);
       if(!isMatch){
           return res.status(400).json({msg:'Invalid password!'});
       }

       const payload = {
        user:{
            id: user.id
        }
    }

    jwt.sign({payload}, config.get('jwtSecret'), {expiresIn:'360000'}, (err,token)=>{
        res.json({
            token
        })
    })

    }catch(error){
       console.log(error.message);
       res.status(500).json({msg: 'server error'});
    }
})

module.exports = router;