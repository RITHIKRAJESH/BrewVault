const express =require('express')
const cors=require('cors')
const app=express()
const path=require('path')
require('dotenv').config()

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const dbConnect=require('./models/dbConnect')
dbConnect()

const userRouter=require('./routers/userRouter')
const adminRouter=require('./routers/adminRouter')

app.use("/user",userRouter)
app.use("/admin",adminRouter)

const port =process.env.PORT || 8000

app.listen(port,()=>{console.log("Server running at",port)})