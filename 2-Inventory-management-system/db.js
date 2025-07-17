const mongoose = require('mongoose');
require('dotenv').config();

const mongoURL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/inventory";

mongoose.connect(mongoURL);
const db = mongoose.connection;
db.on('connected', ()=>{
    console.log("Connection established.");
})

db.on('error', ()=>{
    console.log("Server side error");
})

db.on('disconnected', ()=>{
    console.log("server disconnected.");
})

module.exports = db;