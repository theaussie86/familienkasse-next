import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  return NextResponse.json({ message: "getting a transaction by id" });
}

export async function PUT(req: NextRequest) {
  return NextResponse.json({ message: "updating a transaction by id" });
}

export async function DELETE(req: NextRequest) {
  return NextResponse.json({ message: "deleting a transaction by id" });
}
