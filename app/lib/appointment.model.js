const mongoose = require('mongoose');
import { patient } from './patient.model';

var appointmentSchema = new mongoose.Schema({
    patientId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'patient',
        required:true
    },
    drname:{
        type:String,
        required:true,
    },
    reasonForApp:{
        type:String,
        required:true,
    },
   note:{
        type:String,
        required:true,
    },
    selectedDate:{
        type: Date,
        required: true
    },
    status:{
        type: String,
        enum:['pending','cancel','confirm'],
        default: 'pending',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.models.appointment || mongoose.model('appointment', appointmentSchema);