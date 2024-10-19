import appointmentModel from "@/app/lib/appointment.model.js";
import { verifyToken } from "@/app/lib/createJwtToken";
import { connectionStr } from "@/app/lib/db";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request) {
    return NextResponse.json({ success: true, greet: "Hello" });
}

export async function POST(request) {
    let success = false;
    const payload = await request.json();
    const { drname, reasonForApp, note, selectedDate,patientToken } = payload;

    console.log(payload);
    let id = await verifyToken(patientToken);
    console.log("id => ",id);
    if (!payload) {
        console.log(payload)
        return NextResponse.json({ success, result: "details missing" });

    } else {
        await mongoose.connect(connectionStr);
        let newAppointment = new appointmentModel({patientId:id, drname,reasonForApp,note,selectedDate});
        const result = await newAppointment.save();
        if (result) {
            success = true;
        }

        return NextResponse.json({ success, result });
    }
}