import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/db";
import { SearchRequest } from "@/models/SearchRequest";

export async function GET() {
  try {
    await connect();
    const searches = await SearchRequest.find().populate("customer");
    return NextResponse.json(searches);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch searches" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    await connect();
    const search = await SearchRequest.create(data);
    return NextResponse.json(search, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to save search" },
      { status: 500 }
    );
  }
}
