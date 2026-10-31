// import Image from "next/image";
// import styles from "./page.module.css";

// export default function Home() {
//   return (
//     <div className={styles.page}>
//       <main className={styles.main}>
//         <Image
//           className={styles.logo}
//           src="/next.svg"
//           alt="Next.js logo"
//           width={100}
//           height={20}
//           priority
//         />
//         <div className={styles.intro}>
//           <h1>
//             To get started, edit the{" "}
//             <code className={styles.code}>page.js</code> file.
//           </h1>
//           <p>
//             Looking for a starting point or more instructions? Head over to{" "}
//             <a
//               href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               Templates
//             </a>{" "}
//             or the{" "}
//             <a
//               href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               Learning
//             </a>{" "}
//             center.
//           </p>
//         </div>
//         <div className={styles.ctas}>
//           <a
//             className={styles.primary}
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className={styles.logo}
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={16}
//               height={14}
//             />
//             Deploy Now
//           </a>
//           <a
//             className={styles.secondary}
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Documentation
//           </a>
//         </div>
//       </main>
//     </div>
//   );
// }
import BudgetCard from "@/components/BudgetCard";
import SpendingChart from "@/components/SpendingChart";
import expenses from "@/data/expenses";

import {
  calculateTotalExpenses,
  calculateRemainingBudget,
  calculateCategoryExpenses,
} from "@/utils/Calculations";

export default function Home() {
  const totalBudget = 10000;

  const totalExpenses = calculateTotalExpenses(expenses);

  const remainingBudget = calculateRemainingBudget(
    totalBudget,
    expenses
  );

  const categoryExpenses = calculateCategoryExpenses(expenses);

  return (
    <main>
      <h1>SpendWise Dashboard</h1>

      <div className="budget-container">
        <BudgetCard
          title="Total Budget"
          amount={totalBudget}
        />

        <BudgetCard
          title="Total Expenses"
          amount={totalExpenses}
        />

        <BudgetCard
          title="Remaining Budget"
          amount={remainingBudget}
        />
      </div>

      <SpendingChart categoryExpenses={categoryExpenses} />
    </main>
  );
}