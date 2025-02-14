const express=require('express')
const { registerUser, login, userProfile } = require('../controls/userControl')
const userRouter=express.Router()


userRouter.route("/registeruser").post(registerUser)
userRouter.route("/login").post(login)
userRouter.route("/profile").get(userProfile)
module.exports=userRouter