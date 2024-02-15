const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    fullname: {
        type: String,
        required: [true, 'Please provide a value for the name field.'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Please provide a value for the email field.'],
        unique: true,
        index: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide a value for the password field.'],
    },
    profile: {
        type: String,
        default: 'default.jpg',
    },
},{
    versionKey: false,
});

const User = model('User', userSchema);

module.exports = User;