const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
    },
    username:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
    

})

personSchema.pre('save', async function(next){
    const person = this;

    if(!person.isModified('password')) return next(); //is modified method checks if any changes has occured to that particular field.
    
    try{
        const salt = await bcrypt.genSalt(10); // generates salt spanning 10 units
        
        //Hash password
        const hashedPassword = await bcrypt.hash(person.password,salt);

        // Override the plain password with the hashed one
        person.password = hashedPassword;
    
    } catch(err){
        return next(err);
    }

})

personSchema.methods.comparePassword = async function(candidatePassword){
    try{
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch(err){
        throw err;
    }
}

const Person = mongoose.model('Person',personSchema);
module.exports = Person;