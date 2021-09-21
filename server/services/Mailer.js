const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys')

class Mailer extends helper.Mail{
constructor({subject, recipients}, content){
super();

this.sgApi = sendgrid(keys.sendGridKey);//to communicate the sendgrid api
this.from_email = new helper.Email('omri.s13@gmail.com');
this.subject = subject;
this.body = new helper.Content('text/html', content);
this.recipients = this.formatAddresses(recipients);

this.addContent(this.body);//func that we extend from helper.mail
this.addClickTracking();
this.addRecipients();
}

formatAddresses(recipients){
    return recipients.map(({email})=>{ //destructuring the email property
        return new helper.Email(email); //return array of helper.email mails
    })
}

addClickTracking(){
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true,true);
    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
}

addRecipients(){
    const personalize = new helper.Personalization();
    this.recipients.forEach(recipient=>{
        personalize.addTo(recipient);
    });
    this.addPersonalization(personalize);
}

//send the mailer to sendgrid by post req
async send() {
    const request = this.sgApi.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body:this.toJSON()
    });

    const response = await this.sgApi.API(request);
    return response;   
}

}

module.exports = Mailer;
