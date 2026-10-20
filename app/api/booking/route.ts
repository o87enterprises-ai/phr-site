import { NextRequest, NextResponse } from "next/server";

export interface BookingPayload {
  name: string;
  phone: string;
  email?: string;
  serviceId: string;
  city: string;
  date: string;
  timeSlot: string;
  notes?: string;
}

// Mock available slots — replace with real calendar integration (Cal.com, Calendly, Google Calendar API)
function getMockAvailability(date: string): string[] {
  const base = ["8:00am–10:00am", "10:00am–12:00pm", "1:00pm–3:00pm", "3:00pm–5:00pm"];
  // Pseudo-randomly remove 1–2 slots per day to simulate real availability
  const seed = date.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return base.filter((_, i) => (seed + i) % 3 !== 0);
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date") ?? new Date().toISOString().split("T")[0];
  const slots = getMockAvailability(date);
  return NextResponse.json({ date, slots, available: slots.length > 0 });
}

export async function POST(req: NextRequest) {
  try {
    const body: BookingPayload = await req.json();

    if (!body.name || !body.phone || !body.serviceId || !body.date || !body.timeSlot) {
      return NextResponse.json(
        { error: "name, phone, serviceId, date, and timeSlot are required" },
        { status: 400 }
      );
    }

    // TODO: Create calendar event via Cal.com or Google Calendar API
    // TODO: Send confirmation SMS/email to customer
    // TODO: Notify Tiwayne via SMS

    const confirmationId = `PHR-${body.date.replace(/-/g, "")}-${Date.now().toString(36).toUpperCase().slice(-4)}`;

    console.log("[Booking]", { timestamp: new Date().toISOString(), confirmationId, ...body });

    return NextResponse.json({
      success: true,
      confirmationId,
      message: `Confirmed! Tiwayne will arrive ${body.date} at ${body.timeSlot}. You'll receive a reminder text 30 minutes before.`,
      details: { date: body.date, timeSlot: body.timeSlot, serviceId: body.serviceId },
    });
  } catch (err) {
    console.error("Booking API error:", err);
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
  }
}
