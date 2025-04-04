const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateProfileData, validatePasswordChange } = require("../utilis/validation");
const bcrypt = require("bcrypt");




profileRouter.get("/profile/view",userAuth, async (req, res) => {
    try {
      const user = req.user;
      res.send(user);
    } catch (err) {
      res.status(400).send("ERROR : " + err.message);
    }
  });
profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
  try{  
   if(!validateProfileData(req))
   {
    throw new Error("Data is incorrect");
   }
   const user = req.user;
   Object.keys(req.body).forEach((item)=>user[item]=req.body[item]);

   await user.save();
   res.send("Details Updated Successfully")

  }
  catch(err){
      res.status(400).send(err.message);
  }


})

profileRouter.patch("/profile/password",userAuth,async(req,res)=>{
  try{
    const newPassword = req.body["password"];
    const user = req.user;
    validatePasswordChange(newPassword);
    const isPasswordValid = await user.validatePassword(newPassword);
    if(isPasswordValid)
    {
      throw new Error("Password should not match previous one")
    }
    const passwordHash = await bcrypt.hash(newPassword, 10);
    user["password"] = passwordHash;
    await user.save();
    res.cookie("token",null,{expires:new Date(Date.now())});
    res.send("Password Update Succesfull.Please login again");  
  }
  catch(err)
  {
    res.status(400).send(err.message);
  }
})

module.exports = profileRouter;