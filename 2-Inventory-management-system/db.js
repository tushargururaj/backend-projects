const mongoose = require('mongoose');
require('dotenv').config();

const mongoURL = process.env.MONGO_URL;

const db = mongoose.connect(mongoURL);

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