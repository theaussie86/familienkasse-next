import { z } from "zod";

export const createTransactionSchema = z.object({
  description: z.string().min(1, { message: "Pflichtfeld" }),
  amount: z.literal("").or(z.coerce.number()),
  created: z.coerce.date().optional(),
  account: z.enum(["Sparen", "Spenden", "Investieren"]),
  isPaid: z.boolean().optional(),
});

export type CreateTransactionSchema = z.infer<typeof createTransactionSchema>;

export const transactionSchema = createTransactionSchema.extend({
  _id: z.string(),
  amount: z.number(),
});

export type TransactionSchema = z.infer<typeof transactionSchema>;
