import { verifyToken } from "@/app/lib/createJwtToken";
import { clientPromise } from "@/app/lib/db";
import { ObjectId } from 'mongodb';

import { NextRequest, NextResponse } from "next/server";

interface Payload {
  token: string;
}

interface DecodedId { id: string }

interface VerifyTokenResponse {
  valid: boolean;
  decoded: DecodedId | undefined;
}


export interface Appointment {
  _id: ObjectId;
  patientId: {
    _id: ObjectId;
    fname: string;
  };
  drname: string;
  reasonForApp: string;
  note: string;
  selectedDate: Date;
  status: string;
}


export async function POST(request: NextRequest) {
  try {
    
    const client = await clientPromise;
    const db = client.db('patientAppointmentSystem');
    const payload: Payload = await request.json();
    const { token } = payload;

    if (!token) {
      return NextResponse.json({
        success: false,
        message: "Unauthorized access!",
      });
    }

    const verify: VerifyTokenResponse = await verifyToken(token);

    if (!verify.valid || !verify.decoded) {
      return NextResponse.json({
        success: false,
        message: "Invalid token",
      });
    }
    else {
      
      const isAdmin = await db.collection('admins').findOne({_id: new ObjectId(verify.decoded.id)},{projection:{pin:0}});
      
      if (!isAdmin) {
        return NextResponse.json({
          success: false,
          message: "Unauthorized access!",
        });
      }
    }
    
    const page = parseInt(request.nextUrl.searchParams.get("page") || "1", 10);
    const limit = 10;
    const result = await db.collection('appointments')
    .aggregate([
      {
        $lookup:{
          from:'patients',
          localField: 'patientId',
          foreignField:'_id',
          as: 'patientId'
        }
      },
    {
      $unwind:{  //unwind is used to destructure populated data from array
        path: '$patientId'
      }
    }
    ]).sort({ createdAt: -1 }).toArray();

    const pending = result?.filter((ele: Appointment | any) => ele.status === "pending").length;
    const confirm = result?.filter((ele: Appointment | any) => ele.status === "confirm").length;
    const cancel = result?.filter((ele: Appointment | any) => ele.status === "cancel").length;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedData = result.slice(startIndex, endIndex);
    const hasNextPage = endIndex < result.length;

    return NextResponse.json({
      success: true,
      data: paginatedData,
      pending,
      confirm,
      cancel,
      totalPage: Math.ceil(result.length / limit),
      hasNextPage,
    });

  } catch (error: any) {
    console.error("Error in POST handler:", error);
    return NextResponse.json({
      success: false,
      message: "An unexpected error occurred.",
      error: error.message,
    });
  }
}
