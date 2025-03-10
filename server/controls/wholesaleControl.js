const sellModel = require('../models/productModel');
const productModel = require('../models/wholesalerModel');  
const retailproductModel=require('../models/retailproductModel')

const addproduct = async (req, res) => {
    try {
        const { userid, productName, productCategory, date,quantity } = req.body;

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
            quantity,
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


// const purchaseProduct=async(req,res)=>{
//     try{
//         const {userId,productId,quantity,pickupLocation}=req.body
//         console.log(req.body)
//         const productPurchased=new sellModel({
//             userId,
//             productId,
//             quantity,
//             pickuplocation:pickupLocation
//         })
//         await productPurchased.save()
//         res.json("Product placed successfully wait for our call.")
//     }catch(err){
//         console.log(err)
//     }
// }
const purchaseProduct = async (req, res) => {
    try {
      const { userId, productId, quantity, pickupLocation } = req.body;
  
      // Log the request body for debugging
      console.log(req.body);
  
      // Find the product in the productModel by its productId
      const product = await productModel.findById(productId);
      console.log("Fetched Product: ", product);
  
      // Check if the product exists
    //   if (!product) {
    //     return res.status(404).json({ error: "Product not found" });
    //   }
      // Check if there's enough quantity available
    //   if (product.quantity < quantity) {
    //     return res.status(400).json({ error: "Insufficient stock available" });
    //   }
       
      // Update the quantity of the product
      product.quantity -= quantity;
      console.log("Updated Product: ", product.quantity);
     
      // Save the updated product back to the database
      await product.save();
      console.log("Product saved successfully");
  
      // Create a new entry in the sellModel (purchase record)
      const productPurchased = new sellModel({
        userId,
        productId,
        quantity,
        pickupLocation, // Corrected the typo from 'pickuplocation' to 'pickupLocation'
      });
  
      // Save the purchase record
      await productPurchased.save();
      console.log("Purchase record saved");
  
      // Send a success response
      res.json("Product placed successfully, please wait for our call.");
    } catch (err) {
      console.error("Error during purchase:", err);
      res.status(500).json({ error: "An error occurred while processing the purchase" });
    }
  };
  

const viewplacedOrders=async(req,res)=>{
    try{
        const orders=await sellModel.find().populate("userId") 
        .populate("productId"); 
        res.json(orders)
    }catch(err){
        console.log(err)
    }
}


const updateStatus=async(req,res)=>{
    try{
        const {message,id}=req.body
        const product=await sellModel.findOne({_id:id})
        product.status=message
        product.save()
        res.json(`Order ${message} successfully`)
    }catch(err){
        console.log(err)
    }
}

const updatePayment=async(req,res)=>{
    try{
        const {status,id,quality,totalprice}=req.body
        console.log(req.body)
        const product=await sellModel.findOne({_id:id})
        product.status=status
        product.quality=quality
        product.totalprice=totalprice
        product.save()
        res.json(`Order ${status} successfully`)
    }catch(err){
        console.log(err)
    }
}

const deleteProduct=async(req,res)=>{
    try{
        const id=req.headers._id;
        await productModel.deleteOne({_id:id})
        res.json("Product deleted successfully")
    }catch(err){
        console.log(err)
    }
}

const updateProduct = async (req, res) => {
    try {
      // Destructure values from the request body
      const { productId, date, productCategory, quantity } = req.body;
      console.log(req.body);
  
      // Validate the required fields
      if (!productId || !date || !productCategory || !quantity) {
        return res.status(400).json({ message: "All fields are required!" });
      }
  
      // Prepare the update object
      const updateData = {
        date,
        productCategory,
        quantity
      };
  
      // Use findByIdAndUpdate to update the product with the new data
      const updatedProduct = await productModel.findByIdAndUpdate(
        productId,   // the productId to find the product
        updateData,   // the data to update the product
        { new: true } // option to return the updated document
      );
  
      // If product not found, return 404
      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found!" });
      }
  
      // Return success response with the updated product data
      res.status(200).json({ message: "Product updated successfully!", updatedProduct });
      
    } catch (err) {
      console.error("Error updating product:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  const deleteRetailproduct=async(req,res)=>{
    try{
      const id=req.headers.id
      await retailproductModel.findByIdAndDelete({_id:id})
      res.json("Delete Successfully")
    }catch(err){
        console.log(err)
    }
  }

module.exports = { addproduct,viewProducts,viewProductsById,purchaseProduct,viewplacedOrders,updateStatus,updateProduct,deleteProduct,updatePayment,deleteRetailproduct}; 
