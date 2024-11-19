import appointmentModel from "@/app/lib/appointment.model";
import { connectionStr } from "@/app/lib/db";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import sendMail from "@/app/lib/sendAppointmentStatusMail"
// Define an interface for the request payload
interface UpdateAppointmentPayload {
  appointmentId: string;
  status: string;
  reasonForCancellation?:string;
}

export async function PUT(request: NextRequest): Promise<NextResponse> {
  try {
    // Parse the request body
    const payload: UpdateAppointmentPayload = await request.json();
    const { appointmentId, status } = payload;

    // Validate payload
    if (appointmentId && status) {
      // Ensure the database is connected
      await mongoose.connect(connectionStr);
      // Update the appointment's status
      const result = await appointmentModel.findByIdAndUpdate(
        { _id: appointmentId },
        { status },
        { new: true }
      ).populate("patientId","email")

      let data = result;
      data.reasonForCancellation = payload.reasonForCancellation? payload.reasonForCancellation:"";
      if(result) sendMail(data);

      return NextResponse.json({ success: true, result });
    }

    // Return an error response if validation fails
    return NextResponse.json({ success: false, message: "Invalid data provided." });
  } catch (error: any) {
    console.error("Error in PUT handler:", error);
    return NextResponse.json({ success: false, message: error.message });
  }
}
