const express=require('express')
const User=require("../models/Users")
const router=express.Router()
const { body, validationResult } = require('express-validator');

router.post('/createuser',[
    body('name', "Enter a valid name").isLength({min:3}), 
    body('email', "Enter a valid Email").isEmail(), 
    body('password', "Password must be 5 characters long").isLength({min:5})
],async (req,res)=>{
    try { 
        const errors = validationResult(req); 
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }

        let user= await User.findOne({email:req.body.email})
        if(user){
            return res.status(400).send({msg:"User already exists"}); 
        }
        user= await User.create({name:req.body.name, email: req.body.email, password: req.body.password})

        // .then(user =>{res.json(user)})
        // .catch(err=>{res.json({error:"Please enter a unique value for Email", message:err.message})}); 
        res.json(user);
    } 
    catch (error) {
        console.error(error);
        res.status(500).send("There is some Internal Server Error");
    }
}) 

module.exports=router;  