const mongoose=require('mongoose')
const mongoURI="mongodb+srv://studyvideos789:studyvideos789@cluster0.5fuucpl.mongodb.net/?retryWrites=true&w=majority"

const connectToMongo = async () => {
    await mongoose.connect(mongoURI);
    console.log("Connected to Mongo successfully");
}

module.exports=connectToMongo;       


// const mongoURI="mongodb://localhost:27017/test"
// await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });