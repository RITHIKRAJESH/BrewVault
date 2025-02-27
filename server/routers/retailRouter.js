const express = require("express");
const { addproduct, viewProducts } = require("../controls/retailerControl");
const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
require("dotenv").config();
const path=require('path')
const retailRouter = express.Router();
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "retails", 
        allowedFormats: ["jpg", "jpeg", "png", "gif"],
        public_id: (req, file) => `${Date.now()}-${file.originalname}`, 
    },
});


const upload = multer({ storage: storage }).single("productImage");


retailRouter.post("/addproduct", upload, addproduct);
retailRouter.get("/viewproducts",viewProducts)

module.exports = retailRouter;
