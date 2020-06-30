const mongoose = require('mongoose'),
passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema(({
    username:'',
    avatar:'',
    password:'',
    googleId:'',
    facebookId:'',
    twitterId:''
}))
 
userSchema.plugin(passportLocalMongoose);
const User = mongoose.model('user',userSchema);

module.exports = User;