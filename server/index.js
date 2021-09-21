/*
INSTRUCTINS:
1-For deploy the app in production we will use heroku(web server host our app)
2-We will add engines in package.json and inside we add the versions of node and npm we use to tell heruko in whice versions we use
3-We have to tell heroku what command should run to start the app so we we delete test and add start:node index.js 
4-We add git ignore file to tell who deploy the app the not to download some folders
5-We need to download heroku cli to talk with heruko and do "heroku login" in this terminal then "heroku create"
then we copy the git link, we do "git init"->"git add ."->"git commit -m "df""-> "git remote add heroku"->"git push heroku master" if not working
put the git folder on the server folder, now push the app to heroku using git then we do "heroku open", if we want to see logs do "heroku logs"
6-for depoly the client we need to go to path of client and run "npm run build"
*/

const express = require('express');//common js modules instead of import
const cookieSession = require('cookie-session');
const passport = require('passport');
const mongoose = require('mongoose');//moongose library for connecting to db
const keys = require('./config/keys')

require('./models/User');//load this for future use
require('./models/Survey')
require('./services/passport')//to execute  passportConfig, it doesnt return anything so we just rquire it and it will executed in future use
mongoose.connect(keys.mongoURI,{ useNewUrlParser: true,useUnifiedTopology: true });//connect to mongodb server
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

const authRoutes = require('./routes/authRoutes')//func that takes our app object and attaches the 2 routes to it 
const billingRoutes = require('./routes/billingRoutes')
const surveyRoutes = require('./routes/surveyRoutes')
authRoutes(app);//we can do also- require('./services/passport')(app) instead of the 2 lines
billingRoutes(app);
surveyRoutes(app);

if(process.env.NODE_ENV==='production'){
    //express will serve up production assets
    //like our main.js file ot main.css file
    app.use(express.static('client/build'));//means if any get req comes for some route or anything and we dont understand for what route it comes or we do not have a route handler fot it so look at client/build and try to see if some file matches for what thw req looking for
    //express will serve up the index.html file
    //if it doesnt recognize the route
    const path = require('path');
    app.get('*', (req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));//this line says if someone makes a req to a route that we do not understand kick them to the index.html(client side)
    })
}
//look for the port heruko set us to use(dynamic port in runtime) , if there isnt such port , set by default 5000 , so in development environment we use port 5000 , in production we use whenever port heruko wil provide to us
const PORT = process.env.PORT || 5000;
//this line instructs express to tell nodejs listen on port 5000
app.listen(PORT);