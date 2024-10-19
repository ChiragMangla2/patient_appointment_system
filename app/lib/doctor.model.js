const mongoose = require('mongoose');

var drSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        maxlength: 10
    },
    dob: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        enum: ['m', 'f', 'o'],
        default: 'm'
    },
    emergency_contact_name: {
        type: String,
        required: true,
    },
    emergency_number: {
        type: String,
        required: true,
        trim: true,
        maxlength: 10
    },
    identification_type: {
        type: String,
        required: true,
    },
    identification_number: {
        type: String,
        required: true,
    },
    idCopy:{
        type:String,
        required:true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Doctor', drSchema);