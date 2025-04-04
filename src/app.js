const express = require("express");
const connectDB = require("./config/database.js");
const app = express();
const User = require('./models/user.js');
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

app.post("/signup",async(req,res)=>{
    // creating the new instance of the model...
    const newUser = new User(req.body);
    try{
        await newUser.save();
        res.send("UserAdded Successfully");
    }
    catch(err){
        console.log("Something went wrong");
    }

});
//Get the data from database
app.get("/users",async(req,res)=>{
    const userEmail = req.body.email;
    try{
        const response = await User.find({email:userEmail});
        res.send(response);
    }
    catch(err){
        console.log("Something went wrong")
    }

});

connectDB ().then((result) => {
    console.log("Database is not conneccting...");
    app.listen(3000,()=>{
        console.log("Server is listening....");
    })

}).catch((err) => {
    console.log("Database is not established");
});
