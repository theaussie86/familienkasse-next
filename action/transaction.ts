"use server";

import connectMongo from "@/libs/mongoose";
import { authOptions } from "@/libs/next-auth";
import Transaction from "@/models/Transaction";
import { getServerSession } from "next-auth";
import { revalidateTag, unstable_cache } from "next/cache";

export const fetchTransactions = unstable_cache(
  async () => {
    try {
      await connectMongo();
      const transactions = await Transaction.find();
      return transactions.map((transaction) => transaction.toObject());
    } catch (error) {
      console.error(error);
    }
  },
  ["transactions"],
  {
    tags: ["transactions"],
    revalidate: 600,
  }
);

export async function deleteTransaction(id: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new Error("Unauthorized");
    }
    await connectMongo();
    await Transaction.findByIdAndDelete(id).then(() => {
      revalidateTag("transactions");
    });
  } catch (error) {
    console.error(error);
  }
}

export async function updateTransaction(id: string, data: any) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new Error("Unauthorized");
    }
    await connectMongo();
    await Transaction.findByIdAndUpdate(id, data).then(() => {
      revalidateTag("transactions");
    });
  } catch (error) {
    console.error(error);
  }
}

export async function createTransaction(data: any) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new Error("Unauthorized");
    }
    await connectMongo();
    await Transaction.create({ ...data, amount: data.amount * 100 }).then(
      () => {
        revalidateTag("transactions");
      }
    );
  } catch (error) {
    console.error(error);
  }
}
