const mongoose = require('mongoose');


const personSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    age:{
        type: Number,
    },
    work:{
        type: String,
        enum: ['chef','manager','waiter'],
        required: true
    },
    mobile: {
        type: String
    },
    email:{
        type: String,
        unique: true
    }

})

const Person = mongoose.model('Person',personSchema);
module.exports = Person;