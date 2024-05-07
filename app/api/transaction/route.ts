import connectMongo from "@/libs/mongoose";
import Transaction from "@/models/Transaction";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectMongo();
    const transaction = new Transaction(req.body);
    await transaction.save();

    return NextResponse.json(transaction);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message, status: 500 });
  }
}
