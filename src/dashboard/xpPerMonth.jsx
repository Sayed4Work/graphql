import { useEffect, useState } from "react";
import { queryData } from "../api/api";
import { LineChart } from "@mui/x-charts/LineChart";

function XpPerMonth() {
  const [monthlyXp, setMonthlyXp] = useState([]);
  const [totalXp, setTotalXp] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchXp = async () => {
      const query = `
        {
          transaction(
            where: { 
              type: { _eq: "xp" }, 
              event: { object: { name: { _eq: "Module" } } } 
            }, 
            order_by: { id: asc }
          ) {
            id
            amount
            createdAt
          }
        }`;

      try {
        const data = await queryData(query);
        if (data && data.length > 0) {
          const transactions = data;

          const monthlyXp = getMonthlyXp(transactions);
          const totalxp = getTotalXp(transactions);
          setMonthlyXp(monthlyXp);
          setTotalXp(totalxp);
        } else {
          setError("Could not fetch XP data");
        }
      } catch (error) {
        setError(
          error.message || "An unexpected error occurred while fetching XP data"
        );
      }
    };
    fetchXp();
  }, []);

  return (
    <>
      {error && <p className="text-white text-center text-lg font-bold mb-2">{error}</p>}

      {monthlyXp.length > 0 && totalXp ? (
      <div>
          <LineChart
            xAxis={[{ scaleType: "point", data: monthlyXp.map((d) => d.month) }]}
            series={[{ data: monthlyXp.map((d) => d.xp), curve: "linear" , color: "rgba(2, 154, 2, 0.6)" }]}
            width={600}
            height={400}
          />
        </div>
      ) : null}
    </>
  );
}

export default XpPerMonth;

function getMonthlyXp(transactions) {
  if (!transactions.length) return [];

  // Get the latest transaction date
  const latestDate = new Date(
    Math.max(...transactions.map(t => new Date(t.createdAt)))
  );

  // Prepare a Map for the last 12 months with 0 XP
  const monthlyXpMap = new Map();

  for (let i = 11; i >= 0; i--) {
    const date = new Date(latestDate);
    date.setMonth(date.getMonth() - i);

    const key = `${date.getFullYear()}-${date.getMonth()}`; // Unique key per month
    monthlyXpMap.set(key, {
      month: date.toLocaleString('default', { month: 'short' }) + ` ${date.getFullYear()}`,
      xp: 0,
    });
  }

  // Add XP to the correct month
  transactions.forEach(t => {
    const date = new Date(t.createdAt);
    const key = `${date.getFullYear()}-${date.getMonth()}`;
    if (monthlyXpMap.has(key)) {
      monthlyXpMap.get(key).xp += t.amount / 1000;
    }
  });

  // Format the result
  return Array.from(monthlyXpMap.values()).map(({ month, xp }) => ({
    month,
    xp: parseFloat(xp.toFixed(2))
  }));
}

  

function getTotalXp(transactions) {
  return transactions.reduce((acc, transaction) => acc + transaction.amount / 1000, 0).toFixed(0);
}
