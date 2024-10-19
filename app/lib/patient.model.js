const mongoose = require('mongoose');

var patientSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    address: {
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
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['m', 'f', 'o'],
        default: 'm'
    },
    occupation: {
        type: String,
        required: true,
    },
    emergencyName: {
        type: String,
        required: true,
    },
    emergencyNum: {
        type: String,
        required: true,
        trim: true,
        maxlength: 10
    },
    primaryPhysician: {
        type: String,
        required: true,
    },
    insuranceProvider: {
        type: String,
        required: true,
    },
    policyNumber: {
        type: String,
        required: true,
    },
    allergies: {
        type: String,
        required: true,
    },
    currentMedication: {
        type: String,
        required: true,
    },
    familyMedicalHistory: {
        type: String,
        required: true,
    },
    postMedicalHistory: {
        type: String,
        required: true,
    },
    identificationType: {
        type: String,
        required: true,
    },
    identificationNumber: {
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

export const patient = mongoose.models.patient || mongoose.model('patient',patientSchema)