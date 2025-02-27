const userModel=require('../models/userModel')
const argon2 = require('argon2')
const jwt=require("jsonwebtoken")
const sellModel=require('../models/productModel');
const contactModel = require('../models/contactModel');
const registerUser = async (req, res) => {
    try {
        const { username, email, password, role, shopOrFarmName } = req.body;

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.json({ msg: "User Already Exists", status: 400 });
        }

        // Hash the password using Argon2
        const hashedPassword = await argon2.hash(password);

        // Register new user
        const newUser = new userModel({
            username,
            email,
            password: hashedPassword,
            role,
            shopOrFarmName
        });
       
        await newUser.save();
        return res.json({ msg: "User Registered Successfully", status: 200 });

    } catch (err) {
        console.error("Error in registerUser:", err);
        return res.status(500).json({ msg: "Server Error", status: 500 });
    }
};


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ msg: "User Doesn't Exist", status: 500 });
        }

        // Verify password using Argon2
        const isPasswordValid = await argon2.verify(user.password, password);
        const token = jwt.sign({payload:user}, 
            'jwt-key-factor',
            { expiresIn: "7d" } 
        );
        if (isPasswordValid) {
            return res.json({ msg: "Login Successful", status: 200,token:token  });
        } else {
            return res.json({ msg: "Incorrect Password", status: 500 });
        }

    } catch (err) {
        console.error("Error in login:", err);
        return res.status(500).json({ msg: "Server Error", status: 500 });
    }
};


const userProfile=async(req,res)=>{
    try{
        const id=req.headers._id
        const user=await userModel.findOne({_id:id})
        res.json(user).status(200)
       
    }catch(err)
    {
        res.json(err)
    }
}

const viewplacedOrders=async(req,res)=>{
    try{
        const userid=req.headers.id
        const orders=await sellModel.find({userId:userid})  
        .populate("productId"); 
        res.json(orders)
    }catch(err){
        console.log(err)
    }
}


const addContact=async(req,res)=>{
    try{
        const {name,email,message}=req.body
        const contact=new contactModel({
            name,email,message
        })
        await contact.save()
        res.json({msg:"Message Received Successfully"})
    }catch(err){
        res.json(err)
}};

module.exports={registerUser,login,userProfile,viewplacedOrders,addContact}