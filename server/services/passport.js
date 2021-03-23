const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose')
const keys = require('../config/keys')

const User = mongoose.model('users');//1 arg means that we want to fetch/pull from the model, User is model class now

//generic register, hi passport use authenticate with startegy i give you(google startegy)
passport.use(new GoogleStrategy({
    clientID:keys.googleClientID,
    clientSecret:keys.googleClientSecret,
    callbackURL:'/auth/google/callback'//route that the user will be sent to after he grant permission about the app

},(accessToken,refreshToken,profile,done)=>{
    User.findOne({googleID:profile.id}).then((existingUser)=>{
        if(existingUser){
            //we already have a record with this profile id so do anything
        }else{
            //we dont have a record with this profile id
            new User({googleID:profile.id}).save();//create an instance of the model class users(collection) and save it to the db to collection called users as we define 
        }
    })
})
);
