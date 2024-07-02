"use server";

import connectMongo from "@/libs/mongoose";
import Transaction from "@/models/Transaction";

export async function fetchTransactions() {
  try {
    await connectMongo();
    const transactions = await Transaction.find();
    return transactions;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteTransaction(id: string) {
  try {
    await connectMongo();
    await Transaction.findByIdAndDelete(id);
  } catch (error) {
    console.error(error);
  }
}

export async function updateTransaction(id: string, data: any) {
  try {
    await connectMongo();
    await Transaction.findByIdAndUpdate(id, data);
  } catch (error) {
    console.error(error);
  }
}
