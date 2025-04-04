const express = require("express");

const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectRequest");
const User = require("../models/user");



requestRouter.post("/request/sent/:status/:userId", userAuth, async (req, res) => {
  try{
    const user = req.user;
    const status = req.params.status;
    const fromUserId = user._id;
    const toUserId = req.params.userId;

    if(fromUserId == toUserId)
    {
      throw new Error("You can't send request to yourself");
    }
    const allowedStatus = ["ignored","intrested"];
    if(!allowedStatus.includes(status))
    {
      return res.status(400).json({message:"Invalid status type:" + status})
    }
    const existuser = await User.findById(toUserId);
    if(!existuser)
    {
      return res.status(400).json({message : "User not found"})
    }

    const connected = await ConnectionRequest.findOne({
      $or: [
        {fromUserId,toUserId},
        {
          fromUserId:toUserId,toUserId:fromUserId
        }
      ]
    });
    if(connected)
    {
      return res.status(400).send("Connection request already exist");
    }
    
    const connectionreq = new ConnectionRequest({
      fromUserId,
      toUserId,
      status
    });
    await connectionreq.save();
    res.send("Requenst Sent");
  }
  catch(err){
    res.send(err.message)
  }
    
});

module.exports= requestRouter;