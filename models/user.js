import { Schema, model } from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const userSchema = new Schema(({
    username: '',
    avatar: '',
    password: '',
    googleId: '',
    facebookId: '',
    twitterId: ''
}))

userSchema.plugin(passportLocalMongoose);
const User = model('user', userSchema);

export default User;