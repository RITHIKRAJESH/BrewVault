const productModel = require('../models/wholesalerModel');  

const addproduct = async (req, res) => {
    try {
        const { userid, productName, productCategory, date } = req.body;

        let parsedCategories;
        try {
            parsedCategories = JSON.parse(productCategory);
        } catch (err) {
            return res.status(400).json({ message: "Invalid productCategory format" });
        }

        parsedCategories = parsedCategories.map(cat => ({
            quality: cat.quality,
            price: Number(cat.price),
        }));

        const productImage = req.file ? req.file.path : null; // Cloudinary URL

        const newProduct = new productModel({
            userid,
            productName,
            productCategory: parsedCategories,
            date,
            productImage, // Cloudinary Image URL
        });

        await newProduct.save();

        res.status(201).json({ message: "Product added successfully!", product: newProduct });

    } catch (error) {
        console.error("Error in addproduct:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};



const viewProducts=async(req,res)=>{
    try{
        const products=await productModel.find()
        res.json(products)
    }catch(err){
        console.log(err)
    }
}

const viewProductsById = async (req, res) => {
    try {
        const userId = req.headers.userid;
        
        if (!userId) {
            return res.status(400).json({ error: "User ID is required in headers" });
        }

        const products = await productModel.find({ userid: userId });

        if (!products.length) {
            return res.status(404).json({ message: "No products found for this user" });
        }

        res.status(200).json(products);
    } catch (err) {
        console.error("Error fetching products:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { addproduct,viewProducts,viewProductsById}; 
