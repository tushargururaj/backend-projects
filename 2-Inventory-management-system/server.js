const app = require('express')();
const bodyParser = require('body-parser');
const db = require('./db');
const Product = require('./models/product');
const productRoutes = require('./routes/productRoutes');
const { jwtAuthMiddleware } = require('./jwt');
PORT = 3000;

app.use(bodyParser.json());


const logRequest = (req,res,next) =>{
    console.log(`[${new Date().toLocaleString()}] request made to: ${req.originalUrl}]`);
    next()
}

app.use(logRequest);

app.get('/', (req,res) => {
    res.send("Welcome to Inventory Management System");
})

app.use('/product',jwtAuthMiddleware,productRoutes);


app.listen(PORT, ()=>{
    console.log("Listening to port 3000");
})