/*
INSTRUCTINS:
1-For deploy the app we will use heroku(web server host our app)
2-We will add engines in package.json and inside we add the versions of node and npm we use to tell heruko in whice versions we use
3-We have to tell heroku what command should run to start the app so we we delete test and add start:node index.js 
4-We add git ignore file to tell who deploy the app the not to download some folders
5-We need to download heroku cli to talk with heruko and do "heroku login" in this terminal then "heroku create"
then we copy the git link, we do "git init"->"git add ."->"git commit -m "df""-> "git remote add heroku"->"git push heroku master" if not working
put the git folder on the server folder, now push the app to heroku using git then we do "heroku open", if we want to see logs do "heroku logs"
*/

const express = require('express');//common js modules instead of import
const cookieSession = require('cookie-session');
const passport = require('passport');
const mongoose = require('mongoose');//moongose library for connecting to db
const keys = require('./config/keys')

require('./models/User');//load this for future use
require('./services/passport')//to execute  passportConfig, it doesnt return anything so we just rquire it and it will executed in future use
mongoose.connect(keys.mongoURI);//connect to mongodb server
const authRoutes = require('./routes/authRoutes')//func that takes our app object and attaches the 2 routes to it 
const billingRoutes = require('./routes/billingRoutes')
const app = express();//set up configuration that will listen to incoming requests from node to express,all route handlers will associated to this app
/*
Cookie Use and Enabling
*/
//this 4 middlewares will take the incoming request and makes adjusments to it(extracting cookie data and pull user id from it)
//enabling cookies in our app
app.use(express.json());//instead body parser
app.use(
    cookieSession({//allows us to specify any cookie
        maxAge: 30*24*60*60*1000,//how much time will last
        keys:[keys.cookieKey]
    })
);
//telling passport to use cookies to manage the auth
app.use(passport.initialize());
app.use(passport.session());


authRoutes(app);//we can do also- require('./services/passport')(app) instead of the 2 lines
billingRoutes(app);

//look for the port heruko set us to use(dynamic port in runtime) , if there isnt such port , set by default 5000 , so in development environment we use port 5000 , in production we use whenever port heruko wil provide to us
const PORT = process.env.PORT || 5000;
//this line instructs express to tell nodejs listen on port 5000
app.listen(PORT);