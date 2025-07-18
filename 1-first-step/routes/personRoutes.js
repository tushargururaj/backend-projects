const Person = require('../models/person');
const router = require('express').Router();
const {jwtAuthMiddleware, generateToken} = require("../jwt");

router.post('/signup', async (req,res)=>{
    try{
        const data = req.body;
        const newPerson = new Person(data);
        const response = await newPerson.save();

        const payload = {
            id: response.id,
            username: response.username
        }
        const token = generateToken(payload);
        res.status(200).json({response: response, token: token});


    } catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.post('/login', async(req, res) => {
    try{
        const {username, password} = req.body;

        const user = await Person.findOne({username: username});

        // If user does not exist or password does not match, return error
        if( !user || !(await user.comparePassword(password))){
            return res.status(401).json({error: 'Invalid username or password'});
        }

        // generate Token 
        const payload = {
            id: user.id,
            username: user.username
        }
        const token = generateToken(payload);

        // resturn token as response
        res.json({token})
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/', async (req,res) => {
    try{
    const data = await Person.find();
    console.log("Data fetched successfully!");
    res.status(200).json(data);
    } catch(err){
        console.log(err);
        res.status(500).json({error: "Internal Server error :( "});
    }

})

router.get('/:workType', async (req,res)=>{
    try{
        const workType = req.params.workType;
        if(workType == 'chef' || workType == 'manager' || workType == 'waiter')
        {
            const response = await Person.find({work: workType});
            console.log("Successfully fetched the data");
            res.status(200).json(response);
        } else {
            res.status(404).json({error: "Invalid work type."})
        }
    } catch(err){
        console.log(err);
        res.status(500).json({error: "Internal server issue :("});
    }
})
router.put('/:id', async (req,res) => {
    try{
    const personId = req.params.id;
    const updatedPersonData = req.body;

    const response = await Person.findByIdAndUpdate(personId,updatedPersonData,{
        new: true,
        runValidators: true
    })
    if(!response){
        return res.status(404).json({error: "Person not found"});
    }
    console.log("Data updated!")
    res.status(200).json(response);
} catch(err){
        console.log(err);
        res.status(500).json({error: "Internal server issue :("});    
}
})

router.delete("/:id", async (req,res) => {
    try{
        const personId = req.params.id;
        const response = await Person.findByIdAndDelete(personId);
        if(!response){
            return res.status(404).json({error: "Person not found."});
        }
        console.log("Data deleted.");
        res.status(200).json(response);
    } catch(err){
        console.log(err);
        res.status(500).json({error: "Internal server issue :("});    
}
})

module.exports = router;