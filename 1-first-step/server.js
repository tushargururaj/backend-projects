const app = require('express')();
const db = require('./db');
const passport = require("./auth");
require('dotenv').config();
const {jwtAuthMiddleware, generateToken} = require("./jwt");
const PORT = process.env.PORT || 3000;


const bodyParser = require('body-parser');
app.use(bodyParser.json());


//middleware functions 
const logRequest = (req,res,next) => {
    console.log(`[${new Date().toLocaleString()}] Rest Made to : ${req.originalUrl}`);
    next();
}

app.use(logRequest);

app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', {session: false});

app.get('/', localAuthMiddleware, (req,res)=>{
    res.send("Welcome to our hotel");
})

const personRoutes = require('./routes/personRoutes')
app.use('/person',jwtAuthMiddleware,personRoutes);

const menuItemRoutes = require('./routes/menuItemRoutes');
app.use('/menu', menuItemRoutes);

app.listen(PORT, () => {
    console.log("listening to server on port 3000");
})