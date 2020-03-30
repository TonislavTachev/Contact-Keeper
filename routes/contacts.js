const express = require('express');
const router = express.Router();
const {check, validationResult } = require('express-validator/check');
const User = require('../models/User');
const Contact = require('../models/Contact');
const auth = require('../middleware/auth'); 

//@route    GET api/contacts
//@desc     Get all users contacts
//@access Private

router.get('/', auth, async(req,res)=>{
    try{
        const contacts = await Contact.find({user: req.user.id}).sort({date: -1}) //sort by most recent date
        res.json(contacts);
    } catch(error){
        console.log(error.message);
        res.status(500);
    }
})

//@route    POST api/contacts
//@desc     Adds new contact
//@access Private

router.post('/', [auth, [
    check('name', 'Name is required').not().isEmpty()
]] ,async(req,res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()}); //errors.array is a method that gives an array full of the errors
    }

    const {name, email, phone,type } = req.body;

    try{
       const newContact = new Contact({
           name,
           email,
           phone,
           type,
           user : req.user.id
       });

       const contact = await newContact.save();
       res.json(contact);
    }catch(error){
         console.log(error.message);
         res.status(500).send('Server error');
    }

})

//@route    put api/contacts/:id
//@desc     Updates existing contact
//@access  Private

router.put('/:id',auth ,async(req,res)=>{
    const {name, email, phone, type} = req.body;

    //Build contact object
    const contactFields = {};
    if(name) contactFields.name = name;
    if(email) contactFields.email = email;
    if(phone) contactFields.phone = phone;
    if(type) contactFields.type = type;
 

    try {
        let contact = await Contact.findById(req.params.id);

        if(!contact){
            return res.status(404).json({msg: "Contact not found"});
        }

      //Make sure user owns contact
      if(contact.user.toString() !== req.user.id){ //making it into a string, because otherwise the check is not going to happen
        return res.status(401).json({msg : 'Not Authorized'});
      }
      contact = await Contact.findByIdAndUpdate(req.params.id, {$set: contactFields}, {new :true}); //specifying exactly which parameters we would
      //like to update
      res.json(contact);
    } catch(error){
        console.log(error.message);
        res.status(500).json("Server Error");
    }

})

//@route   delete api/contacts/:id
//@desc    Deletes existing contact
//@access  Private


router.delete('/:id', auth,async(req,res)=>{
    try {
        let contact = await Contact.findById(req.params.id);

        if(!contact){
            return res.status(404).json({msg: "Contact not found"});
        }

      //Make sure user owns contact
      if(contact.user.toString() !== req.user.id){ //making it into a string, because otherwise the check is not going to happen
        return res.status(401).json({msg : 'Not Authorized'});
      }
       await Contact.findByIdAndDelete(req.params.id); //specifying exactly which parameters we would
      //like to update
      res.json({msg: "Contact deleted!"});
    } catch(error){
        console.log(error.message);
        res.status(500).json("Server Error");
    }
})

module.exports = router;