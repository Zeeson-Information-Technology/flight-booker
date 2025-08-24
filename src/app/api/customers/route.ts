import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/db";
import { Customer } from "@/models/Customer";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    await connect();
    const customer = await Customer.create(data);
    return NextResponse.json(customer, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create customer" }, { status: 500 });
  }
}
