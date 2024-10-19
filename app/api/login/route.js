import { generateToken } from "@/app/lib/createJwtToken";
import { patient } from "@/app/lib/patient.model";
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
        let data = await patient.findOne({ fname: payload.fname, email: payload.email, phone: payload.phone });
        if (data) {
            console.log("Patient is already exist")
            const id = data._id;
            const token = await generateToken(id);
            return NextResponse.json({ success:true, data,token});
        } else {
            return NextResponse.json({ success,result:"patient not exist" });
        }
    }
}