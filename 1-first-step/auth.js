const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./models/person');

passport.use(new LocalStrategy(async (username,password,done)=>{
    try{
        console.log('Received credentials: ', username, password);
        const user = await  Person.findOne({username: username});
        if(!user){
            return done(null, false, {message: 'Incorrect username.'});
        }
        const isCorrectPass = user.comparePassword(password);
        if(isCorrectPass){
            return done(null, user);
        } else {
            return done(null,false,{message: 'Incorrect Password.'});
        }
    } catch(err){
        return done(err);
    }
}))

module.exports = passport;