const mongoose=require('mongoose')


const userSchema=new mongoose.Schema({
    username:{type:String},
    email:{type:String},
    password:{type:String},
    role:{type:String}
})


const userModel=new mongoose.model("user_tbl",userSchema)

module.exports=userModel