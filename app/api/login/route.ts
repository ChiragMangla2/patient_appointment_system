import { generateToken } from "@/app/lib/createJwtToken"
import { NextResponse } from "next/server";
import { clientPromise } from "@/app/lib/db";
import { NextRequest } from "next/server";

type PayloadType = {
    fname: string;
    email: string;
    phone: string;
};

export async function POST(request: NextRequest) {
    let success: boolean = false;
    const payload: PayloadType | null = await request.json();

    if (!payload) {
        console.log(payload)
        return NextResponse.json({ success, message: "Details missing" });

    } else {
        // connect with db
        const client = await clientPromise;
        const db = client.db('patientAppointmentSystem');
        let data = await db.collection('patients').findOne({ fname: payload.fname, email: payload.email, phone: payload.phone });
        if (data) {
            const id = data._id;
            const token = await generateToken(id.toString());
            return NextResponse.json({ success: true, data, token, message: "Login successfully!" });
        } else {
            return NextResponse.json({ success, message: "User not exist" });
        }
    }
}