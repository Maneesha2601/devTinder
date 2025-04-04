const mongoose = require("mongoose");

const connectDB = async()=>{
    await mongoose.connect("mongodb+srv://maneeshareddykonda2601:WWUHD8FfILl41Ku2@cluster0.zstty.mongodb.net/devTinder");
}

module.exports=connectDB;