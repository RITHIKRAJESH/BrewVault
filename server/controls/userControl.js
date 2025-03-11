const userModel=require('../models/userModel')
const argon2 = require('argon2')
const jwt=require("jsonwebtoken")
const sellModel=require('../models/productModel');
const contactModel = require('../models/contactModel')
const nodemailer = require("nodemailer");

const registerUser = async (req, res) => {
    try {
        const { username, email, password, role, shopOrFarmName,mobile } = req.body;

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
            shopOrFarmName,
            mobile,
            status:"pending"
        });
       
        await newUser.save();
        return res.json({ msg: "User Registered Successfully", status: 200 });

    } catch (err) {
        console.error("Error in registerUser:", err);
        return res.status(500).json({ msg: "Server Error", status: 500 });
    }
};

const updateStatus=async(req,res)=>{
  try{
    const id=req.headers.id
    console.log(id)
    const user=await userModel.findById({_id:id})
    user.status="approved"
    user.save()
    res.json("Updated Successfully")
  }catch(err){
    console.log(err)
  }
}


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

 // Assuming you have a User model set up
const crypto = require("crypto"); // For generating a random OTP

// Configure Nodemailer transporter for sending emails
const transporter = nodemailer.createTransport({
  service: "gmail", // You can use any email service provider
  auth: {
    user: "", // Use your email here
    pass: "", // Your email password or App password
  },
});

// Store OTP temporarily (could also be done in a session or in-memory store like Redis)
let storedOTP = null;
let otpExpiry = null;
 
const forgetPassword = async (req, res) => {
    const { email } = req.body;
    console.log(email)
    try {
      // Step 1: Check if the user exists
      const user = await userModel.findOne({email:email});
    //   if (!user) {
    //     return res.status(404).json({ msg: "No account found with that email address." });
    //   }
  
      // Step 2: Generate a random 6-digit OTP
      const otp = crypto.randomInt(100000, 999999).toString(); // Generates a random 6-digit number
  
      // Step 3: Store the OTP and its expiry time (e.g., 10 minutes)
      storedOTP = otp;
      otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes expiry time
  
      // Step 4: Send the OTP to the user's email
      const mailOptions = {
        from: "rajeshrithik49@gmail.com",
        to: user.email,
        subject: "Password Reset OTP",
        html: `
          <p>You requested a password reset. Your OTP is: <strong>${otp}</strong></p>
          <p>This OTP will expire in 10 minutes.</p>
          <p>If you did not request this, please ignore this email.</p>
        `,
      };
  
      // Send the email with the OTP
      await transporter.sendMail(mailOptions);
  
      // Step 5: Respond to the client with a success message and send the OTP
      return res.status(200).json({
        msg: "OTP sent to your email. It will expire in 10 minutes.",
        otp: otp,  // Send OTP to frontend
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "An error occurred while sending the OTP." });
    }
  };
  const verifyOTP = async (req, res) => {
    const { email, otp } = req.body;
  
    try {
      // Step 1: Check if OTP exists and hasn't expired
      if (!storedOTP || Date.now() > otpExpiry) {
        return res.status(400).json({ msg: "OTP is either expired or invalid." });
      }
  
      // Step 2: Check if the entered OTP matches the stored one
      if (storedOTP !== otp) {
        return res.status(400).json({ msg: "Invalid OTP. Please try again." });
      }
  
      // Step 3: OTP is valid, proceed to reset the password (send reset link or change password)
      return res.status(200).json({ msg: "OTP verified successfully." });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "An error occurred while verifying the OTP." });
    }
  };
  const updatePassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;
    
    console.log("Received email: ", email);
    const user=await userModel.findOne({email:email})
    try {
       
      console.log("User found: ", user);
      user.password = await argon2.hash(newPassword); 
      await user.save();
  
      // Step 3: Return success message
      return res.status(200).json({ msg: "Password updated successfully!" });
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "An error occurred while updating the password." });
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

const updateProfile = async (req, res) => {
    try {
      const id = req.headers._id; // Extract user ID from request headers
      const { mobile, accountno, ifsc } = req.body; // Extract the fields to be updated from the request body
  
      // Find the user by ID and update the fields
      const user = await userModel.findOne({ _id: id });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" }); // If the user is not found, send a 404 response
      }
  
      // Update the user's details
      user.mobile = mobile || user.mobile;
      user.accountno = accountno || user.accountno;
      user.ifsc = ifsc || user.ifsc;
  
      // Save the updated user document
      const updatedUser = await user.save();
  
      // Respond with the updated user
      return res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
  
    } catch (err) {
      console.error("Error updating profile:", err);
      return res.status(500).json({ message: "Server error", error: err.message });
    }
  };
  
  
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
            name,email,message,status:"pending"
        })
        await contact.save()
        res.json({msg:"Message Received Successfully"})
    }catch(err){
        res.json(err)
}};

module.exports={registerUser,login,userProfile,viewplacedOrders,addContact,updateProfile,forgetPassword,verifyOTP,updatePassword,updateStatus}