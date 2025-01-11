import { clientPromise } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from 'mongodb';
import sendMail from "@/app/lib/sendAppointmentStatusMail"


interface UpdateAppointmentPayload {
  appointmentId: string;
  status: string;
  reasonForCancellation?: string;
}

export async function PUT(request: NextRequest): Promise<NextResponse> {
  try {
    // Parse the request body
    const payload: UpdateAppointmentPayload = await request.json();
    const { appointmentId, status } = payload;

    // Validate payload
    if (appointmentId && status) {
      // database is connecte
      const client = await clientPromise;
      const db = client.db('patientAppointmentSystem');

      // Update the appointment's status
      const result = await db.collection('appointments').findOneAndUpdate(
        { _id: new ObjectId(appointmentId) },
        {$set: { status }},
        { returnDocument: 'after' }
      )

      let data:any = result;
      data.reasonForCancellation = payload.reasonForCancellation ? payload.reasonForCancellation : "";
      if (result) sendMail(data);

      return NextResponse.json({ success: true, result });
    }

    // Return an error response if validation fails
    return NextResponse.json({ success: false, message: "Invalid data provided." });
  } catch (error: any) {
    console.error("Error in PUT handler:", error);
    return NextResponse.json({ success: false, message: error.message });
  }
}
