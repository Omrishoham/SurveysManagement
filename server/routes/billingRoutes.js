const keys = require('../config/keys');
const stripe = require('stripe');
const requireLogin = require('../middlewares/requireLogin')
stripe(keys.stripeSecretKey);
module.exports = app =>{
    //when there will be a post req to this route , express call requireLogin itself as middleware and then do the async func
    app.post('/api/stripe',requireLogin,async (req,res) =>{
       const charge =  await stripe.charges.create({
            amount:500,
            currency:'usd',
            description:'5$ for 5 credits',
            source: req.body.id
        });
        req.user.credits+=5;//we get the user from req by passport
        const user = await req.user.save();
        res.send(user);
    });

};