const express =require('express')
const cors=require('cors')
const app=express()
const path=require('path')
require('dotenv').config()

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(process.env.PORT,()=>{console.log("Server running at",process.env.PORT)})