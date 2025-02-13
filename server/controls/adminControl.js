const { model } = require('mongoose')
const userModel=require('../models/userModel')


const login=async(req,res)=>{
    try{
        const {email,password}=req.body
        const user=await userModel.findOne({email:email})
        if(!user){
            res.json({msg:"Admin Don't exists",status:500})
        }else{
            if(user.password==password){
                res.json({msg:"Login Successfull",status:200})
            }
            else{
                res.json({msg:"Admin password wrong",status:500})
            }
        }
    }
    catch(err){
        console.log(err)
    }
}

const viewfarmers=async(req,res)=>{
   try{
    const users=await userModel.find({role:"farmers"})
    res.json(users).status(200)
   }catch(err){
    console.log(err)
   }
}

module.exports={login,viewfarmers}