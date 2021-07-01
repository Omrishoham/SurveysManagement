const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose')
const keys = require('../config/keys')

const User = mongoose.model('users');//1 arg means that we want to fetch/pull from the model, User is model class now

//generic register, hi passport use authenticate with startegy i give you(google startegy)
passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback', proxy: true
    //route that the user will be sent to after he grant permission about the app
    //we set proxy true instead of dealing with the addresses if it dev or prod so proxy:true just let googleStrategt to calculate the address correctly
    //instead proxy:true we can define the exactly address in property called GoogleRedirectUri in dev and prod keys

},
    async (accessToken, refreshToken, profile, done) => {
        const existingUser = await User.findOne({ googleID: profile.id });
        if (existingUser) {
            //we already have a record with this profile id so do anything
            return done(null, existingUser);//func that tell passport that we finished with the db
        }
        //we dont have a record with this profile id
        const user = await new User({ googleID: profile.id }).save().
            done(null, user);//create an instance of the model class users(collection) and save it to the db to collection called users as we define 
    })
);

//gives a token(user.id) as a cookie to the user browser after he try to login(firstly register or login again afterlogout), automatically called after we get the user model in the callback
passport.serializeUser((user, done) => {
    done(null, user.id);
});

//called when user comeback (without logout) , take the cookie compare it to the user id in db and gives user what he want so this func turn user id to a user
passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
})
