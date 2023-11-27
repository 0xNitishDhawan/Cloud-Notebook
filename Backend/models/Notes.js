const mongoose=require('mongoose')
const { Schema } = mongoose;

const NotesSchema = new Schema({
    title:{
        type:String,
        required:[true,'Title is required']
    },
    description:{
        type:String,
        required:[true,'Description is required']
    },
    tag:{
        type:String,
        default: "General"
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports=mongoose.model("notes", NotesSchema);