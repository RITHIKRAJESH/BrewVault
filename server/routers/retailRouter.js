const express = require("express");
const { addproduct, viewProducts, updateProduct, viewProduct, addToCart, viewCart, removeItem, incrementQuantity, decrementQuantity, retailOrder, viewOrder, updateOrderStatus} = require("../controls/retailerControl");
const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

require("dotenv").config();

const retailRouter = express.Router();

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
retailRouter.put("/updateproduct",upload,updateProduct)
retailRouter.get("/viewproduct",viewProduct)
retailRouter.post("/addCart",addToCart)
retailRouter.get("/viewCart",viewCart)
retailRouter.delete("/removeCartItem",removeItem)
retailRouter.put("/incrementQuantity",incrementQuantity)
retailRouter.put("/decrementQuantity",decrementQuantity)
retailRouter.post("/checkout",retailOrder)
retailRouter.get("/fetchOrder",viewOrder)
retailRouter.put("/updateOrderStatus",updateOrderStatus)

module.exports = retailRouter;
