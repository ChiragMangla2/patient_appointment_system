import adminModel from "@/app/lib/admin.model.js";
import { generateToken } from "@/app/lib/createJwtToken";
import { connectionStr } from "@/app/lib/db";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
    let success = false;
    const payload = await request.json();
    const { pin } = payload;
    console.log(pin)

    if (!pin) {
        return NextResponse.json({ success, result: "details missing" });

    } else {
        await mongoose.connect(connectionStr);
        let result = await adminModel.findOne();
        if (result) {
            if (pin == result.pin) {
                success = true;
                const token = await generateToken(result._id)
                return NextResponse.json({ success, token,message:"Login success" });
            }
            return NextResponse.json({ success,message:"Access denied" });
        }
        
        return NextResponse.json({ success,message:"Access denied" });
    }
}