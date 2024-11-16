import { connectionStr } from "@/app/lib/db";
import Patient from "@/app/lib/patient.model";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

// Define the type for the patient payload
interface PatientPayload {
    fname?: string;
    email?: string;
    phone?: string;
    dob?: Date;
    gender?: string;
    address?: string;
    occupation?: string;
    emergencyName?: string;
    emergencyNum?: string;
    primaryPhysician?: string;
    insuranceProvider?: string;
    policyNumber?: string;
    allergies?: string;
    currentMedication?: string;
    familyMedicalHistory?: string;
    postMedicalHistory?: string;
    identificationType?: string;
    identificationNumber?: string;
    idCopy?: string;
}

export async function GET(request:NextRequest) {
    return NextResponse.json({ success: true, greet: "Hello" });
}

export async function POST(request:NextRequest) {
    let success = false;

    try {
        // Parse payload
        const payload:PatientPayload = await request.json();

        // Validate payload
        if (!payload || !payload.fname || !payload.email || !payload.phone || !payload.dob) {
            return NextResponse.json({ success, message: "Missing required fields" });
        }

        // Connect to MongoDB
        if (!mongoose.connection.readyState) {
            await mongoose.connect(connectionStr);
        }

        // Check if patient already exists
        const patientExist = await Patient.findOne({
            fname: payload.fname,
            email: payload.email,
            dob: payload.dob,
            phone: payload.phone,
        });

        if (patientExist) {
            return NextResponse.json({ success, message: "Patient already exists" });
        }

        const newPatient = new Patient({...payload});

        const result = await newPatient.save();
        if (result) success = true;

        return NextResponse.json({ success, result, message: "Registered successfully!" });
    } catch (error) {
        console.error("Error in patient registration:", error);
        return NextResponse.json({ success, message: "Internal server error" });
    }
}