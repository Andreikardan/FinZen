import React from "react";
import { Cell, Legend, Pie, PieChart } from "recharts";
import { Tooltip } from "antd";
import { ArrayTransactionDsType } from "@/entities/transactionD/model";
import { ArrayTransactionRsType } from "@/entities/transactionR/model";
import { ArrayCategoryDsWithTransactions, ArrayCategoryRsWithTransactions } from "@/entities/category";

interface BudgetStatisticsProps {
  transactionDs: ArrayTransactionDsType ;
  transactionRs: ArrayTransactionRsType;
  categoriesRs: ArrayCategoryRsWithTransactions;
  categoriesDs: ArrayCategoryDsWithTransactions;
}

export const BudgetStatistics: React.FC<BudgetStatisticsProps> = ({
  categoriesRs,
  categoriesDs,
}) => {
 console.log(categoriesRs, 6666);

  const expenseDataCategRs = categoriesRs?.map((category) => ({
    name: category.name,
    value: category.TransactionRs?.reduce((sum, transaction) => sum + transaction.sum, 0) || 0,
  }));
console.log(categoriesRs, 8888);



 console.log(expenseDataCategRs);
 
  const expenseDataCategDs = categoriesDs?.map((category) => ({
    name: category.name,
    value: category.TransactionDs?.reduce((sum, transaction) => sum + transaction.sum, 0) || 0,
  }));

console.log(expenseDataCategDs);

  const COLORS = ["var(--primary-blue)", "var(--primary-purple)", "var(--primary-light-purple)", "#FF8042", "#AF19FF"];

  return (
    <div>
 
      <div>
        <h2>Распределение расходов по категориям</h2>
        <PieChart width={400} height={300}>
          <Pie
            data={expenseDataCategRs}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {expenseDataCategRs?.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>

 
      <div>
        <h2>Распределение доходов по категориям</h2>
        <PieChart width={400} height={300}>
          <Pie
            data={expenseDataCategDs}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {expenseDataCategDs?.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
};