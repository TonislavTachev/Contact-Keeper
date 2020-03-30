const express = require('express');
const router = express.Router();
const {check, validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');


//REGISTER USER
router.post('/',  [
    check('name', 'Name is required').not().isEmpty(), //check whether the name attribute is empty
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with six or more characters').isLength({min: 6}) //specifies the minimum character length of the password
]
,async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()}); //errors.array is a method that gives an array full of the errors
    }

    const {name, email, password} = req.body;

    try{
        let user = await User.findOne({email});
        
        if(user){
            res.status(400).json({msg: "User already exists"});
            return;
        }
       //before saving the user to the database we need to hash the password
       user = new User({
           name,
           email,
           password
       });

       const salt = await bcrypt.genSalt(10); //determines how secure the salt is

       user.password = await bcrypt.hash(password, salt);

       await user.save();

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
        
    }catch(err){
       console.log(err.message);
       res.status(500).send('Server error');
    }
})

module.exports = router;