import StatsSection from "@/components/StatsSection";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import WeissteinerTable from "@/components/table";
import CreateTransactionForm from "@/components/CreateTransactionForm";
import config from "@/config";
import { fetchTransactions } from "@/action/transaction";
import { authOptions } from "@/libs/next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect(config.auth.loginUrl);
  }

  const transactions = await fetchTransactions();
  return (
    <div className="space-y-8">
      <StatsSection />
      <section>
        <div className="flex justify-between">
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            Letzten Transaktionen
          </h3>
          <CreateTransactionForm />
        </div>
        <WeissteinerTable
          data={transactions ?? []}
          showPagination={false}
          isSearchable={false}
        />
      </section>
    </div>
  );
}
