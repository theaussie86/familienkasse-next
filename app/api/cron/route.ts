import connectMongo from "@/libs/mongoose";
import type { NextRequest } from "next/server";
import { format } from "date-fns";
import Transaction from "@/models/Transaction";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  // Your cron job logic here

  const kw = format(new Date(), "'KW' ww, yyyy");

  const data = [
    {
      amount: 600,
      account: "Sparen",
      description: `Sparen ${kw}`,
      isPaid: false,
      created: new Date(),
    },
    {
      amount: 200,
      account: "Spenden",
      description: `Spenden ${kw}`,
      isPaid: false,
      created: new Date(),
    },
    {
      amount: 200,
      account: "Investieren",
      description: `Investieren ${kw}`,
      isPaid: false,
      created: new Date(),
    },
  ];
  try {
    await connectMongo();
    await Transaction.insertMany(data);
    // Your logic here
  } catch (error) {
    console.error(error);
    return new Response("Error", {
      status: 500,
    });
  }

  return Response.json({ success: true });
}
