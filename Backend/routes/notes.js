const express=require('express')
const router=express.Router()
const Note=require("../models/Note")
const fetchuser=require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator');

//ROUTE 1: For Fetching the Notes  using GET  "api/notes/fetchallnotes"  Login Required  (READ)
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


//ROUTE 2: For Creating the Notes  using POST  "api/notes/addnote"  Login Required       (CREATE)
router.post("/addnote",fetchuser,[
    body('title', "Enter a valid Title").isLength({min:3}), 
    body('description', "Description must be 5 characters long").isLength({min:5}),
    body('tag',"Enter a Tag").exists()
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



//ROUTE 3: To Update Note  using PUT  "api/notes/updatenote/:id"  Login Required        (UPDATE)
router.put("/updatenote/:id",fetchuser,[
    body('title', "Enter a valid Title").isLength({min:3}), 
    body('description', "Description must be 5 characters long").isLength({min:5}),
    body('tag',"Enter a Tag").exists()
],async (req,res)=> {
    try {
        const errors = validationResult(req); 
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }
        const {title, description, tag}=req.body;
        let newNote={}
        if(title){newNote.title=title};
        if(description){newNote.description=description};
        if(tag){newNote.tag=tag};

        let note=await Note.findById(req.params.id);
        if(!note){return res.status(404).send("Note not Found")}
        if(note.user.toString()!==req.user.id){return res.status(401).send("Unauthorized Access")}
        note= await Note.findByIdAndUpdate(req.params.id, {$set:newNote},{new:true})

        res.json({note}); 
    } 
    catch (error) {
        console.error(error);
        res.status(500).send("There is some Internal Server Error");
    }
})


//ROUTE 4: To Delete Note  using POST  "api/notes/deletenote/:id"  Login Required        (DELETE)
router.delete("/deletenote/:id",fetchuser,async (req,res)=> {
    try {
        //Finding the note in the database and checking whether it exists or not
        let note=await Note.findById(req.params.id);

        if(!note){return res.status(404).send("Note not Found")}

        //Checking user authorization to delete this note
        if(note.user.toString()!==req.user.id){return res.status(401).send("Unauthorized Access")}

        note= await Note.findByIdAndDelete(req.params.id);
        res.json({msg:"Deleted Successfully!","note":Note})
    } 
    catch (error) {
        console.error(error);
        res.status(500).send("There is some Internal Server Error");
    }
})

module.exports=router;  