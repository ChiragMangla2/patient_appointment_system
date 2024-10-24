import adminModel from "@/app/lib/admin.model";
import appointmentModel from "@/app/lib/appointment.model";
import { verifyToken } from "@/app/lib/createJwtToken";
import { connectionStr } from "@/app/lib/db";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
    await mongoose.connect(connectionStr);

    const payload = await request.json();
    const {token} = payload;
    if(!token){
        return NextResponse.json({ success: false, message:"Unauthorised access!"});
    }

    // 1. logic pura ho gya h buss kuch chije reh gyi h jase jub new registeration form open ho usme missing detail ko hide kro or tabhe show kro jab subit button click ho and baki pages me bhe
    // 2. Image ko multer ki help se server per store kro new registeration form me
    // 3. Typescript ko add kro
    // 4. Responsiveness
    
    const verify = await verifyToken(token);
    if(!verify.valid){
        return NextResponse.json({ success: false,message:"Invalid token"});
    }
    let isAdmin = await adminModel.findById(verify.decoded.id).select("-pin");
    if(!isAdmin){
        return NextResponse.json({ success: false,message:"Unauthorised access!"});
    }

    const page = await request.nextUrl.searchParams.get('page') || 1;
    const limit = 10;
    const pageNumber = parseInt(page);
    let result = await appointmentModel.find()
        .populate('patientId', '_id fname');
    let pending = result?.filter(ele => ele.status == "pending").length;
    let confirm = result?.filter(ele => ele.status == "confirm").length;
    let cancel = result?.filter(ele => ele.status == "cancel").length;

    const startIndex = (pageNumber - 1) * limit;
    const endIndex = pageNumber * limit;
    const paginatedData = result?.slice(startIndex, endIndex);
    const hasNextPage = endIndex < result.length;

    return NextResponse.json({ success: true, data: paginatedData, pending, confirm, cancel, totalPage: result.length, hasNextPage });
}