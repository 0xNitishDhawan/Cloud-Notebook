const mongoose=require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name:{
        type:String,
        required:true
    }, 
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type: Date,
        default: Date.now
        // required:true
    }
});

const User=mongoose.model("user", UserSchema);
<<<<<<< HEAD
=======
User.createIndexes();
>>>>>>> cbce442a2b38b5ab02f6b4165ef4131967dba5e0
module.exports=User;