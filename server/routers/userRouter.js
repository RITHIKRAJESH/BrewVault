const express=require('express')
const { registerUser, login } = require('../controls/userControl')
const userRouter=express.Router()


userRouter.route("/registeruser").post(registerUser)
userRouter.route("/login").post(login)

module.exports=userRouter