const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description:{
        type: String,
    },
    Category:{
        type: String,
        enum: ["electronics","stationary","clothing","consumable"],
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    },
    price: {
        type: Number,
        required: true
    },
    supplier:{
        type: String
    }
})

const Product = mongoose.model('product',productSchema);
module.exports = Product;