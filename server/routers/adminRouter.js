const express=require('express')
const { login, viewfarmers, addTips, viewtips, deleteTips, viewCount, deleteUsers, viewMessages,sentResponse } = require('../controls/adminControl')
const path=require('path')
const adminRouter=express.Router()
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
adminRouter.route("/login").post(login)
adminRouter.route("/viewfarmer").get(viewfarmers)
adminRouter.route("/addtips").post(addTips)
adminRouter.route("/viewtips").get(viewtips)
adminRouter.route("/deletetips").delete(deleteTips)
adminRouter.route("/countuser").get(viewCount)
adminRouter.route("/deleteuser").delete(deleteUsers)
adminRouter.route("/viewmessages").get(viewMessages)
adminRouter.route("/respond").post(sentResponse)
module.exports=adminRouter

