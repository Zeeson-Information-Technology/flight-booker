import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/db";
import { Customer } from "@/models/Customer";

export async function GET() {
  try {
    await connect();
    const customers = await Customer.find();
    return NextResponse.json({ ok: true, customers });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { ok: false, error: "Failed to fetch customers" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    await connect();
    const customer = await Customer.create(data);
    return NextResponse.json({ ok: true, customer }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { ok: false, error: "Failed to create customer" },
      { status: 500 }
    );
  }
}
