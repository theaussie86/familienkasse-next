import CreateTransactionForm from "@/components/CreateTransactionForm";
import StatCard from "@/components/StatCard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { fetchTransactions } from "@/action/transaction";
import { BarChart4, Gift, Banknote } from "lucide-react";
import WeissteinerTable from "@/components/table";

export const dynamic = "force-dynamic";

// This is a private page: It's protected by the layout.js component which ensures the user is authenticated.
// It's a server compoment which means you can fetch data (like the user profile) before the page is rendered.
// See https://shipfa.st/docs/tutorials/private-page
export default async function Dashboard() {
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
  console.log(transactions);

  return (
    <main className="min-h-screen p-8 pb-24">
      <section className="max-w-xl mx-auto space-y-8">
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          Aktueller Stand
        </h3>

        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((item) => (
            <StatCard item={item} key={item.id} />
          ))}
        </dl>
      </section>
      <section>
        <div className="flex justify-between">
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            Letzten Transaktionen
          </h3>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary" size="sm">
                Neue Transaktion
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white">
              <DialogHeader>
                <DialogTitle>Neue Transaktion erstellen</DialogTitle>
                <DialogDescription asChild>
                  <CreateTransactionForm />
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        <WeissteinerTable
          data={transactions ?? []}
          showPagination={false}
          isSearchable={false}
        />
      </section>
    </main>
  );
}
