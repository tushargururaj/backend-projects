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

router.get("/:taste", async (req,res) => {
    try{
    const taste = req.params.taste;
    if(taste == spicy || taste == sour || taste == sweet || taste == bitter){
        const response = Menu.find({taste: taste});
        if(!response){
            return res.status(404).json({error: "Dish with that taste doesn't exist"});
        } else {
            console.log("Data fetched successfully!");
            res.status(200).json(response);
        }
    } else {
        res.status(404).json({error: "Invalid aste type"});
    } } catch(err){
        console.log(err);
        res.status(500).json({error: "Internal server error :("})
    }

})
module.exports = router;