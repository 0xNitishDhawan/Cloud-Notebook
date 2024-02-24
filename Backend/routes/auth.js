const express=require('express')
const User=require("../models/Users")
const router=express.Router()
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecretKey="abcd$123@1"
const fetchuser=require('../middleware/fetchuser')

//ROUTE 1: For CREATING the User using POST "api/auth/createuser"
router.post('/createuser',[
    body('name', "Enter a valid name").isLength({min:3}), 
    body('email', "Enter a valid Email").isEmail(), 
    body('password', "Password must be 5 characters long").isLength({min:5})
],async (req,res)=>{
    try {  
        const errors = validationResult(req); 
        let success=false;
        if(!errors.isEmpty()){
            return res.status(400).json({success,errors:errors.array()})
        }
        
        const salt = await bcrypt.genSaltSync(10);
        const secretPassword= await bcrypt.hash(req.body.password, salt);
        
        let user= await User.findOne({email:req.body.email})
        if(user){
            return res.status(400).send({success,msg:"User already exists"}); 
        }
        user= await User.create({name:req.body.name, email: req.body.email, password: secretPassword})
        const data={
            user:{ 
                id:user.id
            }
        } 
        var authtoken = jwt.sign(data, jwtSecretKey);
        success=true;
        res.json({success,authtoken});   
    } 
    catch (error) {
        console.error(error);
        res.status(500).send("There is some Internal Server Error");
    }
}) 


//ROUTE 2: For LOGGING IN the user using POST "api/auth/login"
router.post('/login',[
    body('email', "Enter a valid Email").isEmail(), 
    body('password', "Password cannot be a blank").exists()
],async (req,res)=>{
    try {  
        const errors = validationResult(req); 
        let success=false;
        if(!errors.isEmpty()){
            return res.status(400).json({success,errors:errors.array()})
        }
        const {email,password}=req.body

        let user= await User.findOne({email});
        if(!user){
            return res.status(400).send({success,msg:"Please enter correct login credentials."}); 
        }
        
        const passwordCompare= await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            return res.status(400).send({success,msg:'Please enter correct login credentials.'});
        }

        const data={
            user:{
                id:user.id
            }
        }
        var authtoken = jwt.sign(data, jwtSecretKey);
        success=true;
        res.json({success,authtoken});  
    } 
    catch (error) {
        console.error(error);
        res.status(500).send("There is some Internal Server Error");
    } 
}) 


//ROUTE 3: For Getting the DATA of the user using POST      Login Required
router.post('/getuser', fetchuser,async (req,res)=>{
    try {  
        const userID=req.user.id;
        const user=await User.findById(userID).select("-password");
        res.send(user);          
    } 
    catch (error) {
        console.error(error);
        res.status(500).send("There is some Internal Server Error");
    } 
}) 


module.exports=router;  