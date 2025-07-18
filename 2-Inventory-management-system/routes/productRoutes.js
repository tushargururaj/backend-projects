const mongoose = require('mongoose');
const router = require('express').Router();
const Product = require('../models/product');
const { generateToken } = require('../jwt');


router.get("/", async (req,res)=>{
    try{
    const data = await Product.find();
    if(!data){
        return res.status(404).json({error: "No data Found."})
    };
    console.log("Data fetched successfully!");
    res.status(200).json(data);
} catch (err){
    console.log(err);
    res.status(500).json({error: "Internal server issue :("});
}
}
)

router.post("/signup", async (req,res) => {
    try{
    const data = req.body;
    const newProduct = new Product(data);
    const response = await newProduct.save();

    const payload = {
        id: response.id,
        username: response.username

    }
    const token = generateToken(payload);
    console.log("Data successfully added.");
    res.status(200).json({response: response, token: token});
} catch(err){
    console.log(err);
    res.status(500).json({error: "Internal server issue :("});
}
})
router.get("/login", async(req,res)=>{
    const {username, password} = req.body;

    const user = await Product.findOne({username: username});

    if(!user || await !user.comparePassword(password)){
        return res.status(401).json({error: "Incorrect password or username"});
    }

    const token = generateToken({
        id: user.id,
        username: username
    })
    console.log("Successfully logged in");
    res.json({token: token});
})
router.put("/:id", async (req,res) => {
    try{
    const productId = req.params.id;
    const data = req.body;
    
    const response = await Product.findByIdAndUpdate(productId,data);
    console.log("Successfully updated!");
    res.status(200).json(response);
    } catch (err){
    console.log(err);
    res.status(500).json({error: "Internal server issue :("});
    }

})

router.delete("/:id", async (req,res) => {
    try{
    const productId = req.params.id;
    
    const response = await Product.findByIdAndDelete(productId);
    console.log("Successfully Deleted!");
    res.status(200).json(response);
    } catch (err){
    console.log(err);
    res.status(500).json({error: "Internal server issue :("});
    }

})
module.exports = router;