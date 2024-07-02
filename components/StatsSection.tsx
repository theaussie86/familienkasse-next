import React from "react";
import StatCard from "./StatCard";
import { fetchTransactions } from "@/action/transaction";
import { Banknote, BarChart4, Gift } from "lucide-react";

async function StatsSection() {
  const transactions = await fetchTransactions();
  const savings = transactions.filter((t) => t.account === "Sparen");
  const donations = transactions.filter((t) => t.account === "Spenden");
  const investments = transactions.filter((t) => t.account === "Investieren");
  const stats = [
    {
      id: 1,
      name: "Spenden",
      icon: Gift,
      target: savings.reduce((acc, curr) => acc + curr.amount, 0),
      actual: savings.reduce(
        (acc, curr) => (curr.isPaid ? acc + curr.amount : acc),
        0
      ),
    },
    {
      id: 2,
      name: "Sparen",
      icon: Banknote,
      target: donations.reduce((acc, curr) => acc + curr.amount, 0),
      actual: donations.reduce(
        (acc, curr) => (curr.isPaid ? acc + curr.amount : acc),
        0
      ),
    },
    {
      id: 3,
      name: "Investieren",
      icon: BarChart4,
      target: investments.reduce((acc, curr) => acc + curr.amount, 0),
      actual: investments.reduce(
        (acc, curr) => (curr.isPaid ? acc + curr.amount : acc),
        0
      ),
    },
  ];
  return (
    <section className="space-y-8">
      <h3 className="text-base font-semibold leading-6 text-gray-900">
        Aktueller Stand
      </h3>

      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((item) => (
          <StatCard item={item} key={item.name} />
        ))}
      </dl>
    </section>
  );
}

export default StatsSection;
