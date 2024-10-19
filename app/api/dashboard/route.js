import appointmentModel from "@/app/lib/appointment.model";
import { connectionStr } from "@/app/lib/db";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request){
    await mongoose.connect(connectionStr);
    // isme check bhe kro ki only admin can see this api data
    let data = await appointmentModel.find().populate('patientId','_id fname');
    return NextResponse.json({success:true,data});
}