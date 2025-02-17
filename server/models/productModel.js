const mongoose=require("mongoose")

const sellSchema=new mongoose.Schema({
    userId:{ type: mongoose.Schema.Types.ObjectId, ref: "user_tbl", required: true },
    productId:{ type: mongoose.Schema.Types.ObjectId, ref: "product_tbl", required: true },
    quantity:{type:String},
    status:{type:String,default:"pending"}
},{timestamps:true})


const sellModel=new mongoose.model("sell_tbl",sellSchema)

module.exports=sellModel