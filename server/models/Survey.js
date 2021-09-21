//mongo limit data on single record of survey for example is 4mb- need to pay attention to that
const mongoose = require('mongoose');
const {Schema} = mongoose;
const RecipientSchema = require('./Recipient');

const surveySchema = new Schema({
    title: String,
    body: String,
    subject: String,
    recipients: [RecipientSchema],//array of recipient schema(records)
    yes: {type:Number,default:0},
    no:{type:Number,default:0},
    _user: {type:Schema.Types.ObjectId, ref:'User'}, //to make moongose understand that each survey belong to a specific user, it called _user but it can call ownedBy also
    dateSent: Date,
    lastResponded: Date
});

mongoose.model('surveys',surveySchema);