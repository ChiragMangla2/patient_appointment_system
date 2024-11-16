import mongoose, { Schema, Document, Model } from 'mongoose';

// Define an interface for the Admin document
interface IAdmin extends Document {
    user: string;
    pin: string;
}

var adminSchema: Schema<IAdmin> = new mongoose.Schema({
    user:{
        type:String,
        required:true,
    },
    pin:{
        type:String,
        required:true,
    }
});

const Admin: Model<IAdmin> = mongoose.models.admin || mongoose.model<IAdmin>('admin', adminSchema);

export default Admin;