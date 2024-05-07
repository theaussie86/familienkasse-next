import connectMongo from "@/libs/mongoose";
import Transaction from "@/models/Transaction";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectMongo();
    const transaction = await Transaction.findById(params.id);

    if (!transaction) {
      return NextResponse.json({ error: "Transaction not found", status: 404 });
    }
    return NextResponse.json(transaction);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message, status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectMongo();
    const transaction = await Transaction.findById(params.id);

    if (!transaction) {
      return NextResponse.json({ error: "Transaction not found", status: 404 });
    }

    transaction.set(req.body);
    await transaction.save();

    return NextResponse.json(transaction);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message, status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectMongo();
    const transaction = await Transaction.findById(params.id);
    if (!transaction) {
      return NextResponse.json({ error: "Transaction not found", status: 404 });
    }
    const deletedTransaction = await transaction?.deleteOne();
    return NextResponse.json({ deletedTransaction, status: 202 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message, status: 500 });
  }
}
