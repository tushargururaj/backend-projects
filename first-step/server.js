const app = require('express')();
const mongoose = require('mongoose');
const db = require('./db');
const Person = require('./models/person');
const Menu = require('./models/menu');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = 3000;


app.get('/', (req,res)=>{
    console.log("All okay!");
})

const personRoutes = require('./routes/personRoutes')
app.use('/person', personRoutes);

const menuItemRoutes = require('./routes/menuItemRoutes');
app.use('/menu', menuItemRoutes);

app.listen(PORT, () => {
    console.log("listening to server on port 3000");
})