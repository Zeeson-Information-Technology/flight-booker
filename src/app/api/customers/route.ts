import { NextResponse } from "next/server";
import { db, Customer } from "@/lib/db";
import { randomUUID } from "crypto";

export async function POST(req: Request) {
  try {
    const { name, email, phone } = await req.json();
    if (!name || !email) {
      return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
    }
    const customer: Customer = {
      id: randomUUID(),
      name,
      email,
      phone: phone || "",
      createdAt: new Date(),
    };
    db.customers.unshift(customer);
    return NextResponse.json({ ok: true, id: customer.id });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
