import { generateToken } from "@/app/lib/createJwtToken";
import { clientPromise } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

// Define the structure of the payload
interface AdminLoginPayload {
  pin: string;
}

// Define the structure of the admin model
interface Admin {
  _id: string;
  pin: string;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  let success = false;
  try {
    // Parse and validate the payload
    const payload: AdminLoginPayload = await request.json();
    const { pin } = payload;

    if (!pin) {
      return NextResponse.json({ success, message: "Details missing" });
    }

    // Connect to the database
    const client = await clientPromise;
    const db = client.db('patientAppointmentSystem');

    // Find the admin record
    const result = await db.collection('admins').findOne();

    if (result) {
      // Check if the pin matches
      if (pin === result.pin) {
        success = true;
        const token = await generateToken(result._id.toString());
        return NextResponse.json({ success, token, message: "Admin login success!" });
      } else {
        return NextResponse.json({ success, message: "Not Allowed!" });
      }
    }

    return NextResponse.json({ success, message: "Access denied" });
  } catch (error: any) {
    console.error("Error in POST handler:", error);
    return NextResponse.json({
      success: false,
      message: "An unexpected error occurred",
      error: error.message,
    });
  }
}
