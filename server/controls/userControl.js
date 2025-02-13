const userModel=require('../models/userModel')


const registerUser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        // Check if user already exists
        const existingUser = await userModel.findOne({ email }); 
        if (existingUser) {
            return res.json({ msg: "User Already Exists", status: 400 });
        }

        // Register new user
        const newUser = new userModel({ username, email, password, role });
        await newUser.save();

        return res.json({ msg: "User Registered Successfully", status: 200 });

    } catch (err) {
        console.error("Error in registerUser:", err);
        return res.status(500).json({ msg: "Server Error", status: 500 });
    }
};


const login=async(req,res)=>{
    try{
        const {email,password}=req.body
        const user=await userModel.findOne({email})
        if(!user){
            res.json({msg:"User Don't exists",status:500})
        }else{
            if(user.password==password){
                res.json({msg:"Login Successfull",status:200,role:user.role})
            }
            else{
                res.json({msg:" password wrong",status:500})
            }
        }
    }
    catch(err){
        console.log(err)
    }
}

module.exports={registerUser,login}