import appointmentModel from "@/app/lib/appointment.model";
import { connectionStr } from "@/app/lib/db";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function PUT(request){
    const payload = await request.json();
    const { appointmentId,status } = payload;
    if(appointmentId && status){
        let result = await appointmentModel.findByIdAndUpdate({_id:appointmentId},{status})
        return NextResponse.json({success:true,result});
    }
    return NextResponse.json({success:false});
}