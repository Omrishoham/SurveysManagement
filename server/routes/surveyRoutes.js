const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits')
const Mailer = require('../services/Mailer')
const Survey = mongoose.model('surveys');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate')
module.exports = app => {
    app.get('/api/surveys/thanks',(req,res)=>{
        res.send('Thanks for voting!');
    });

    app.post('/api/surveys',requireLogin, requireCredits,async (req,res)=>{
        const {title, subject, body, recipients} = req.body;

        const survey = new Survey({
            title, //instead of title: title
            subject,
            body,
            recipients: recipients.split(',').map(email => ({ email: email.trim() })),//trim delete whitespaces
            _user: req.user.id,
            dateSent: Date.now()
        });
        //place to send an email
        const mailer = new Mailer(survey, surveyTemplate(survey));
        try{
        await mailer.send();//send mailer to sendgrid for sending it to recipients
        await survey.save();//save the document on db
        req.user.credits-= 1;
        const user = await req.user.save(); //user model returned from save operation

        res.send(user);//return as a respond user model with credits updated
        }catch (err){
            res.status(422).send(err);
        }
    });
};