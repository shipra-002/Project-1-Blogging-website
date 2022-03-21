const mongoose = require('mongoose')
const validator = require('email-validator')

const  authorSchema = new mongoose.Schema ( {
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    title: {
        type: String,
        enum: ['Mr', 'Mrs', 'Miss'],
        required: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true,
        minlength:[3,"minimum 3 letter"]
    },
 }, {timestamps: true})

module.exports = mongoose.model('Author41', authorSchema)