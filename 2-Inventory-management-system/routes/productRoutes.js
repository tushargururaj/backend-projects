const mongoose = require('mongoose');
const router = require('express').Router();
const Product = require('../models/product');


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