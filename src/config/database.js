const mongoose = require("mongoose");

const connectDB = async()=>{
    await mongoose.connect("mongodb+srv://maneeshareddykonda2601:EGlghSl4whrG9MS4@devtinder.g343hqv.mongodb.net/");
}

module.exports=connectDB;

