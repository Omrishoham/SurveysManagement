const mongoose = require('mongoose');
const {Schema} = mongoose;// same to const Schema = mongoose.Schema;
//we going to use the Schema object to create a schema for this new collection , describe how the record will look like
const userSchema = new Schema({
    googleID: String,
    credits: {type: Number,default:0}
});

mongoose.model('users',userSchema);//2 args meands we wanna load something into the model(in this case - schema)