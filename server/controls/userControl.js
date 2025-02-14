const userModel=require('../models/userModel')
const argon2 = require('argon2')
const jwt=require("jsonwebtoken")
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
        console.log("token",token)
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
        console.log(user)
        res.json(user).status(200)
       
    }catch(err)
    {
        res.json(err)
    }
}

module.exports={registerUser,login,userProfile}