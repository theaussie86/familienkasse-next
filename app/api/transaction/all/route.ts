import connectMongo from "@/libs/mongoose";
import { authOptions } from "@/libs/next-auth";
import Transaction from "@/models/Transaction";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    await connectMongo();
    const transactions = await Transaction.find();
    return NextResponse.json(transactions);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message, status: 500 });
  }
}
