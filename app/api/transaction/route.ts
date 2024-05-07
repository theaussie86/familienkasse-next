import connectMongo from "@/libs/mongoose";
import { authOptions } from "@/libs/next-auth";
import Transaction from "@/models/Transaction";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    await connectMongo();
    const transaction = new Transaction(req.body);
    await transaction.save();

    return NextResponse.json(transaction);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message, status: 500 });
  }
}
