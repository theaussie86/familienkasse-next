"use server";

import connectMongo from "@/libs/mongoose";
import Transaction from "@/models/Transaction";
import { revalidateTag } from "next/cache";

export async function fetchTransactions() {
  try {
    await connectMongo();
    const transactions = await Transaction.find();
    return transactions.map((transaction) => transaction.toObject());
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

export async function createTransaction(data: any) {
  try {
    await connectMongo();
    await Transaction.create({ ...data, amount: data.amount * 100 });
    revalidateTag("transactions");
  } catch (error) {
    console.error(error);
  }
}
