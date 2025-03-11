const express=require('express')
const { registerUser, login, userProfile, viewplacedOrders, addContact, updateProfile, forgetPassword, verifyOTP, updatePassword, updateStatus } = require('../controls/userControl')
const userRouter=express.Router()


userRouter.route("/registeruser").post(registerUser)
userRouter.route("/login").post(login)
userRouter.route("/profile").get(userProfile)
userRouter.route("/vieworders").get(viewplacedOrders)
userRouter.route("/contact").post(addContact)
userRouter.route("/update").put(updateProfile)
userRouter.route("/forgot-password").post(forgetPassword)
userRouter.route("/verify-otp").post(verifyOTP)
userRouter.route("/update-password").put(updatePassword)
userRouter.route("/update-status").put(updateStatus)


module.exports=userRouter