const mongoose = require("mongoose");

const connectionRequestSchema =new  mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    status:{
        type:String,
        required:true,
        enum:{
            values:["intrested","rejected","ignored","accepted"],
            message:`{value} is not suported`
        }
    }

},{
    timestamps:true
})

module.exports = mongoose.model("ConnectionRequest",connectionRequestSchema);