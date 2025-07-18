const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req,res,next) => {
    if(!req.headers.authorization) return res.status(401).json({error: "Unauthorised"});
    const token = req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).json("unauthorised");
    
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next()
    } catch(err){
        console.log(err);
        res.status(401).json({error: "Invalid token"});
    }

}

const generateToken = (payload) => {
    return jwt.sign(payload,process.env.JWT_SECRET);
}

module.exports = {generateToken, jwtAuthMiddleware};