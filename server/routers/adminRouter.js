const express=require('express')
const { login, viewfarmers } = require('../controls/adminControl')

const adminRouter=express.Router()

adminRouter.route("/login").post(login)
adminRouter.route("/viewfarmer").get(viewfarmers)


module.exports=adminRouter