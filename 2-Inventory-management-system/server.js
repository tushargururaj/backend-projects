const app = require('express')();
const bodyParser = require('body-parser');
const db = require('./db');
const Product = require('./models/product');
const productRoutes = require('./routes/productRoutes');

app.use(bodyParser.json());

app.get('/', (req,res) => {
    res.send("Welcome to Inventory Management System");
})

app.use('/product',productRoutes);


app.listen(PORT, ()=>{
    console.log("Listening to port 3000");
})