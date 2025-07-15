const mongoose = require('mongoose');
require('dotenv').config();
// Define the MongoDB connection URL
const mongoURL = 'mongodb://127.0.0.1:27017/mydb';

mongoose.connect(mongoURL,{
    useNewUrlParser: true, // typically just write
    useUnifiedTopology: true
})

const db = mongoose.connection; // connection object represents the connection

//event listeners
db.on('connected', ()=>{
    console.log("Successfully connection established.");
})

db.on('error', (err) => {
    console.error("Ran into an error: " , err);
})

db.on('disconnected', ()=>{
    console.log("Connection has severed.")
})

module.exports = db;