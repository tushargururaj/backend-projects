const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

productSchema.pre('save', async function(next){
    const product = this;
    console.log(product);
    if(!product.isModified('password')) return next();
    try{
    const Salt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash(product.password,Salt);
    console.log("hashed");
    product.password = passwordHashed;
    next();
    } catch(err){
        return next(err);
    }
})

productSchema.methods.comparePassword = async function(pass){
    try{
        const isMatch = await bcrypt.compare(pass, this.pass); // firsrt the password thats passed and the internal pass which idk
        return isMatch;
    } catch(err){
        throw err;
    }
}
const Product = mongoose.model('product',productSchema);
module.exports = Product;