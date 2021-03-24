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
            done(null,existingUser);//func that tell passport that we finished with the db
        }else{
            //we dont have a record with this profile id
            new User({googleID:profile.id}).save().then(user=>done(null,existingUser));//create an instance of the model class users(collection) and save it to the db to collection called users as we define 
        }
    })
})
);

//gives a token(user.id) as a cookie to the user browser after he try to login(firstly register or login again afterlogout), automatically called after we get the user model in the callback
passport.serializeUser((user,done)=>{
    done(null,user.id);
});

//called when user comeback (without logout) , take the cookie compare it to the user id in db and gives user what he want so this func turn user id to a user
passport.deserializeUser((id,done)=>{
    User.findById(id).then(user=>{
        done(null,user);
    });
})
