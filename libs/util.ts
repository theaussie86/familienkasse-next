import { type ClassValue, clsx } from "clsx";
import { Banknote, BarChart4, Gift } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { TransactionSchema } from "./schema";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (value: number | undefined) => {
  return (
    value !== undefined &&
    (value / 100).toLocaleString("de-DE", {
      style: "currency",
      currency: "EUR",
    })
  );
};

export const sumupAmounts = (acc: number, transaction: TransactionSchema) =>
  acc + transaction.amount;

export const baseStats = [
  {
    id: 1,
    name: "Sparen",
    icon: Banknote,
  },
  {
    id: 2,
    name: "Spenden",
    icon: Gift,
  },
  {
    id: 3,
    name: "Investieren",
    icon: BarChart4,
  },
];
