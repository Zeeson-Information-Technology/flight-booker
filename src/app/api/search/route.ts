import { NextResponse } from "next/server";
import { db, Search } from "@/lib/db";
import { randomUUID } from "crypto";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customerId, origin, destination, earliestDate, latestDate, passengers = 1, cabin } = body;
    if (!customerId || !origin || !destination || !earliestDate || !latestDate || !cabin) {
      return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
    }
    const search: Search = {
      id: randomUUID(),
      customerId,
      origin,
      destination,
      earliestDate,
      latestDate,
      passengers: Number(passengers) || 1,
      cabin,
      status: "saved",
      createdAt: new Date(),
      query: body,
    };
    db.searches.unshift(search);
    return NextResponse.json({ ok: true, id: search.id });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
