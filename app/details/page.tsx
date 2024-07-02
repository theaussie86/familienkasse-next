import { fetchTransactions } from "@/action/transaction";
import { baseStats, sumupAmounts } from "@/libs/util";
import WeissteinerTable from "@/components/table";
import StatCard from "@/components/StatCard";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import config from "@/config";
import { authOptions } from "@/libs/next-auth";

export const dynamic = "force-dynamic";

async function DetailsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(config.auth.loginUrl);
  }

  const transactions = await fetchTransactions();
  const account = searchParams?.account;

  const stat = baseStats
    ?.map((stat) => ({
      ...stat,
      target: transactions
        ?.filter((transaction) => transaction.account === stat.name)
        ?.reduce(sumupAmounts, 0),
      actual: transactions
        ?.filter(
          (transaction) =>
            transaction.account === stat.name && transaction.isPaid === true
        )
        ?.reduce(sumupAmounts, 0),
    }))
    .find((stat) => stat.name === account);

  const relevantTransactions = account
    ? transactions?.filter((transaction) => transaction.account === account)
    : transactions;

  return (
    <div className="flex flex-col gap-6">
      <section>
        {stat ? (
          <dl className="mt-5 grid grid-cols-1 gap-5">
            <StatCard item={stat} hasLink={false} />
          </dl>
        ) : (
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            Alle Transaktionen
          </h3>
        )}
      </section>
      <section>
        <WeissteinerTable data={relevantTransactions ?? []} />
      </section>
    </div>
  );
}

export default DetailsPage;
