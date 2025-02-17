const express=require('express')
const { login, viewfarmers, addTips, viewtips, deleteTips, viewCount, deleteUsers } = require('../controls/adminControl')

const adminRouter=express.Router()

adminRouter.route("/login").post(login)
adminRouter.route("/viewfarmer").get(viewfarmers)
adminRouter.route("/addtips").post(addTips)
adminRouter.route("/viewtips").get(viewtips)
adminRouter.route("/deletetips").delete(deleteTips)
adminRouter.route("/countuser").get(viewCount)
adminRouter.route("/deleteuser").delete(deleteUsers)
module.exports=adminRouter

