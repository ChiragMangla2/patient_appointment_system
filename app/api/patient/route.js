import { connectionStr } from "@/app/lib/db";
import { patient } from "@/app/lib/patient.model";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request, content) {
    return NextResponse.json({ success: true, greet: "Hello" });
}

export async function POST(request) {
    let success = false;
    const payload = await request.json();

    if(!payload){
        console.log(payload)
        return NextResponse.json({ success, result: "details missing" });

    } else {
        let patientExist = await patient.findOne({ fname: payload.fname, email: payload.email, dob: payload.dob, phone: payload.phone });
        if (patientExist) {
            console.log("Patient is already exist")
            return NextResponse.json({ success, result: "Already patient exist" });
        } else {
            await mongoose.connect(connectionStr)
            const patient = new patientSchema(payload);
            const result = await patient.save();
            if (result) {
                success = true;
            }

            return NextResponse.json({ success, result });
        }
    }
}