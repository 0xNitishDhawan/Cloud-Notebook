const express=require('express')
const router=express.Router()
const Note=require("../models/Note")
const fetchuser=require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator');

//ROUTE 1: For Fetching the Notes  using GET  "api/notes/fetchallnotes"  Login Required
router.get('/fetchallnotes',fetchuser, async(req,res)=>{
    try {  
        const notes=await Note.find({user:req.user.id});
        res.send(notes);
    } 
    catch (error) {
        console.error(error);
        res.status(500).send("There is some Internal Server Error");
    }
}) 


//ROUTE 2: For Creating the Notes  using POST  "api/notes/addnote"  Login Required
router.post("/addnote",fetchuser,[
    body('title', "Enter a valid Title").isLength({min:3}), 
    body('description', "Description must be 5 characters long").isLength({min:5})
],async (req,res)=> {
    try {
        const errors = validationResult(req); 
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }
        const {title, description, tag}=req.body;
        const note=await Note.create({title,description, tag, user:req.user.id})
        res.json(note); 
    } 
    catch (error) {
        console.error(error);
        res.status(500).send("There is some Internal Server Error");
    }
})

module.exports=router;  