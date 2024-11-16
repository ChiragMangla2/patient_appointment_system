import mongoose, { Document, Schema, Model } from 'mongoose';
import Patient from './patient.model';

// Define the interface for the Appointment document
interface IAppointment extends Document {
    patientId: mongoose.Schema.Types.ObjectId;
    drname: string;
    reasonForApp: string;
    note: string;
    selectedDate: Date;
    status: 'pending' | 'cancel' | 'confirm';
    createdAt: Date;
}

var appointmentSchema: Schema<IAppointment> = new Schema<IAppointment>({
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

const Appointment: Model<IAppointment> = mongoose.models.appointment || mongoose.model<IAppointment>('appointment', appointmentSchema);

export default Appointment;

// export default mongoose.models.appointment || mongoose.model('appointment', appointmentSchema);