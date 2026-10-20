import { NextRequest, NextResponse } from "next/server";
import { calculateQuote, type QuoteRequest } from "@/lib/data/pricing";

export async function POST(req: NextRequest) {
  try {
    const body: QuoteRequest = await req.json();

    if (!body.serviceId || !body.scope || !body.city) {
      return NextResponse.json(
        { error: "serviceId, scope, and city are required" },
        { status: 400 }
      );
    }

    const validScopes = ["small", "medium", "large"];
    const validUrgencies = ["standard", "same-day"];

    if (!validScopes.includes(body.scope)) {
      return NextResponse.json({ error: "Invalid scope" }, { status: 400 });
    }
    if (body.urgency && !validUrgencies.includes(body.urgency)) {
      return NextResponse.json({ error: "Invalid urgency" }, { status: 400 });
    }

    const result = calculateQuote({
      ...body,
      urgency: body.urgency ?? "standard",
    });

    return NextResponse.json({ success: true, quote: result });
  } catch (err) {
    console.error("Quote API error:", err);
    return NextResponse.json({ error: "Failed to calculate quote" }, { status: 500 });
  }
}
