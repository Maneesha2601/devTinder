const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    email:{
        type:String
    },
    gender:{
        type:String
    },
    age:{
        type:Number
    }
});

const User = mongoose.model("user",UserSchema);

module.exports = User;
