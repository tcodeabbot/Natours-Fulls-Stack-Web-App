const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs')
//name, email, photo, password, passwordconfirm

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 4,
  },
  // managing the password
  passwordConfirm: {
    type: String,
    require: [true, 'Please confirm your password'],
    //custom validator for confirming password. Only works on CREATE
    validator: function(el) {
        return el == this.password; //abc === abc
    },
    message: 'Passwords are not the same'
  },
});
//IMPLEMENTING THE ENCRYPTION

userSchema.pre('save', async function(next) {
    //only run this function if the password was only modified
    if (!this.isModified('password')) return next();

    //salt value is higher for better encryption. Has the password witht the salt 12
    this.password = await bcrypt.hash(this.password, 12)
    //delete the passwordconfimr filled
    this.passwordConfirm = undefined;
    next()
})
//CREATING THE USER MODEL

const User = mongoose.model('User', userSchema);
module.exports = User;
