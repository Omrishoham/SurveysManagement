const passport = require('passport')

module.exports = (app)=>{
//when user comes to this route handler=> hi passport attempt to autenticate with google=>then the server go to the google startegy we declare up
app.get('/auth/google',passport.authenticate('google',{
    scope:['profile','email']
}));

//this routh handler handle with callback after user grant permission to this callback, then sent request with the code to goolge and then google sent profile of user and we goes to the accessToken up
app.get('/auth/google/callback',passport.authenticate('google'));

app.get('/api/logout',(req,res)=>{
    req.logout();//func that takes cookie with id and kills it
    res.send(req.user);
});
//request>extracts cookie data from cookie session>pulls id from cookie data>desrialize user , turn user id to a user>user model instance added to req object as req.user
app.get('/api/current_user',(req,res)=>{
    res.send(req.user);
});

};