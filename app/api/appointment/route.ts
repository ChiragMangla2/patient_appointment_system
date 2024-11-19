import appointmentModel from "@/app/lib/appointment.model";
import { verifyToken } from "@/app/lib/createJwtToken";
import { connectionStr } from "@/app/lib/db";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import Patient from "@/app/lib/patient.model";

// Define the structure of the payload
interface CreateAppointmentPayload {
  drname: string;
  reasonForApp: string;
  note: string;
  selectedDate: string;
  patientToken: string;
}

// Define the structure of the decoded token
interface DecodedToken {
  id: string;
}

// Define the structure of the verifyToken response
interface VerifyTokenResponse {
  valid: boolean;
  decoded: DecodedToken | undefined;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  let success = false;
  try {
    // Parse and validate the payload
    const payload: CreateAppointmentPayload = await request.json();
    const { drname, reasonForApp, note, selectedDate, patientToken } = payload;

    if (!drname || !reasonForApp || !note || !selectedDate || !patientToken) {
      return NextResponse.json({ success, result: "Details missing" });
    }

    // Verify the token
    const verify: VerifyTokenResponse = await verifyToken(patientToken);

    if (!verify.valid || !verify.decoded) {
      return NextResponse.json({ success, result: "Invalid token" });
    }

    // Connect to the database
    await mongoose.connect(connectionStr);

    // Create a new appointment
    const newAppointment = new appointmentModel({
      patientId: verify.decoded.id,
      drname,
      reasonForApp,
      note,
      selectedDate: new Date(selectedDate), // Convert string to Date
    });

    // Save the appointment to the database
    const result = await newAppointment.save();

    if (result) {
      success = true;
    }

    return NextResponse.json({ success, result });
  } catch (error: any) {
    console.error("Error in POST handler:", error);
    return NextResponse.json({
      success: false,
      result: "An unexpected error occurred",
      error: error.message,
    });
  }
}
