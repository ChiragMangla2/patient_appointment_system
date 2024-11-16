import mongoose, { Document, Schema } from 'mongoose';

// Define the interface for the patient document
interface IPatient extends Document {
    fname: string;
    email: string;
    address: string;
    phone: string;
    dob: string;
    gender: 'm' | 'f' | 'o';  // You can limit the gender to these specific values
    occupation: string;
    emergencyName: string;
    emergencyNum: string;
    primaryPhysician: string;
    insuranceProvider: string;
    policyNumber: string;
    allergies: string;
    currentMedication: string;
    familyMedicalHistory: string;
    postMedicalHistory: string;
    identificationType: string;
    identificationNumber: string;
    idCopy: string;
    createdAt: Date;
}

// Define the schema for the patient
const patientSchema: Schema<IPatient> = new Schema<IPatient>({
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
        maxlength: 10,
    },
    dob: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ['m', 'f', 'o'],
        default: 'm',
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
        maxlength: 10,
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
    idCopy: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Create the model with the defined schema and interface
const Patient = mongoose.models.patient || mongoose.model<IPatient>('patient', patientSchema);

export default Patient;
