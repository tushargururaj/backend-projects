const router = require('express').Router();
const Menu = require('../models/menu');

router.post("/", async (req,res)=>{
    
    try{
    const data = req.body;
    const newMenu = new Menu(data);
    const response = await newMenu.save();
    console.log("Successfully Saved!");
    res.status(200).json(response);
    } catch(err){
        console.log(err);
        res.status(500).json({error: "Internal server error :( "});
    }
})


router.get("/", async (req,res)=>{
    try{
    const data = await Menu.find();
    console.log("Successfully retrieved!");
    res.status(200).json(data);
    } catch(err){
    console.log(err);
    res.status(500).json({error: "Internal Server Error!"});
    }
})

module.exports = router;