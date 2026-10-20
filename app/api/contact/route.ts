import { NextRequest, NextResponse } from "next/server";

export interface ContactPayload {
  name: string;
  phone: string;
  email?: string;
  service?: string;
  city?: string;
  message?: string;
  type?: "quote" | "general" | "emergency" | "property-manager";
}

export async function POST(req: NextRequest) {
  try {
    const body: ContactPayload = await req.json();

    if (!body.name || !body.phone) {
      return NextResponse.json(
        { error: "Name and phone are required" },
        { status: 400 }
      );
    }

    // TODO: Integrate with email provider (Resend, SendGrid, etc.)
    // await sendEmail({
    //   to: "info@precisionhandyrepairs.com",
    //   subject: `New ${body.type ?? "general"} inquiry from ${body.name}`,
    //   html: buildEmailTemplate(body),
    // });

    // TODO: Send SMS notification to Tiwayne via Twilio
    // await sendSMS({ to: process.env.OWNER_PHONE, body: `New lead: ${body.name} ${body.phone} — ${body.service}` });

    console.log("[Contact Lead]", {
      timestamp: new Date().toISOString(),
      ...body,
    });

    return NextResponse.json({
      success: true,
      message: "We received your request. Tiwayne will call you within the hour.",
      referenceId: `PHR-${Date.now().toString(36).toUpperCase()}`,
    });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Failed to submit request" }, { status: 500 });
  }
}
