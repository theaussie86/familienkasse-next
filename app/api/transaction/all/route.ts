import connectMongo from "@/libs/mongoose";
import Transaction from "@/models/Transaction";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongo();
    const transactions = await Transaction.find();
    return NextResponse.json(transactions);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message, status: 500 });
  }
}
