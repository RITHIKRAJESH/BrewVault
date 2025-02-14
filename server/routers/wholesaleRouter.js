const express = require("express");
const { addproduct, viewProductsById, viewProducts } = require("../controls/wholesaleControl");

const WholesaleRouter = express.Router();
const multer = require("multer");
const path = require("path");

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});



// Upload Middleware
const uploads = multer({ storage: storage }).single("productImage");

// Apply the upload middleware to the route
WholesaleRouter.post("/addproduct", uploads, addproduct);
WholesaleRouter.get("/viewproductbyid",viewProductsById);
WholesaleRouter.get("/viewproduct",viewProducts)

module.exports = WholesaleRouter;
