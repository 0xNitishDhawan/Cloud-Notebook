const mongoose=require('mongoose')
const dotenv = require('dotenv');
dotenv.config();
// const mongoURI="mongodb+srv://studyvideos789:studyvideos789@cluster0.5fuucpl.mongodb.net/?retryWrites=true&w=majority"
const mongoURI=`mongodb+srv://studyvideos789:${process.env.MongoDBPassword}@cluster0.5fuucpl.mongodb.net/?retryWrites=true&w=majority`

const connectToMongo = async () => { 
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to Mongo successfully");
    } catch (error) {
        console.log(error)        
    }
}
module.exports=connectToMongo;       

// const mongoURI="mongodb://localhost:27017/test"
// await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });   