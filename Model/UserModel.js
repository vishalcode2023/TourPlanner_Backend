const mongoose = require('mongoose');
const joi = require('joi');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    profileImg:{
        type: String,
        default: ""
    },
    bio:{
        type: String,
        default: ""
    },
})

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = joi.object({
        username: joi.string().min(3).max(30),
        email: joi.string().email().required().required(),
        password: joi.string().min(6).max(1024).required(),
    })

    return schema.validate(user)
}

module.exports = { User, validateUser };