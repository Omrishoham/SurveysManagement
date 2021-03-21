const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys')

//generic register, hi passport use authenticate with startegy i give you(google startegy)
passport.use(new GoogleStrategy({
    clientID:keys.googleClientID,
    clientSecret:keys.googleClientSecret,
    callbackURL:'/auth/google/callback'//route that the user will be sent to after he grant permission about the app

},(accessToken,refreshToken,profile,done)=>{
    console.log('accessToken',accessToken);//when google send profile of the user connected with google, we can save here the profile in our DB
    console.log('refreshToken',refreshToken);
    console.log('profile',profile);
})
);
