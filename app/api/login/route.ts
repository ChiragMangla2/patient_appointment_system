import { generateToken } from "@/app/lib/createJwtToken"
import { NextResponse } from "next/server";
import { connectionStr } from "@/app/lib/db";
import mongoose from "mongoose";
import { NextRequest } from "next/server";
import Patient from "@/app/lib/patient.model";

type PayloadType = {
    fname: string;
    email: string;
    phone: string;
};

export async function GET(request: NextRequest) {
    return NextResponse.json({ success: true, greet: "Hello" });
}

export async function POST(request: NextRequest) {
    let success: boolean = false;
    const payload: PayloadType | null = await request.json();

    if (!payload) {
        console.log(payload)
        return NextResponse.json({ success, message: "Details missing" });

    } else {
        await mongoose.connect(connectionStr)
        let data = await Patient.findOne({ fname: payload.fname, email: payload.email, phone: payload.phone });
        if (data) {
            const id = data._id;
            const token = await generateToken(id);
            return NextResponse.json({ success: true, data, token, message:"Login successfully!" });
        } else {
            return NextResponse.json({ success, message: "User not exist" });
        }
    }
}