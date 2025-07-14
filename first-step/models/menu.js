const mongoose = require('mongoose');
const { type } = require('os');

const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price:{
        type: String,
        required: true
    },
    taste:{
        type: String,
        required: true,
        enum: ["spicy","sour","sweet","bitter"]
    },
    is_drink:{
        type: Boolean,
        default: false
    },
    ingredients:{
        type: Array
    },
    num_sales: {
        type: Number
    }
})

const Menu = mongoose.model('menu',menuSchema);
module.exports = Menu;