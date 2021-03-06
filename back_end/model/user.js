var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    code: {
        type: Number,
        required: true,
    },
    status: {
        type: Boolean,
        default: false
    },
    token: {
        type: String,
        required: true,
    },
    linkedin_access_token: {
        type: String,
        trim: true
    }
});
var User = mongoose.model('User', UserSchema);
module.exports = User;