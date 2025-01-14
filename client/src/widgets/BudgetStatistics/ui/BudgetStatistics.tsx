import React from "react";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";
import { ArrayCategoryDsWithTransactions, ArrayCategoryRsWithTransactions } from "@/entities/category";

interface BudgetStatisticsProps {
  categoriesRs: ArrayCategoryRsWithTransactions;
  categoriesDs: ArrayCategoryDsWithTransactions;
}

export const BudgetStatistics: React.FC<BudgetStatisticsProps> = ({
  categoriesRs,
  categoriesDs,
}) => {

  const calculatePercentageData = (data: { type: string; value: number }[]) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    return data.map((item) => ({
      ...item,
      value: total === 0 ? 0 : (item.value / total) * 100,
    }));
  };


  const expenseDataCategRs = categoriesRs?.map((category) => ({
    type: category.name,
    value: category.TransactionRs?.reduce((sum, transaction) => sum + transaction.sum, 0) || 0,
  }));

  const expenseDataCategRsPercentage = calculatePercentageData(expenseDataCategRs);


  const expenseDataCategDs = categoriesDs?.map((category) => ({
    type: category.name,
    value: category.TransactionDs?.reduce((sum, transaction) => sum + transaction.sum, 0) || 0,
  }));

  const expenseDataCategDsPercentage = calculatePercentageData(expenseDataCategDs);


  const COLORS = ["var(--primary-blue)", "var(--primary-purple)", "var(--primary-light-purple)", "#FF8042", "#AF19FF"];



  const CustomTooltip = ({ active, payload }:any) => {
    if (active && payload && payload.length) {
      const { type, value } = payload[0].payload;
      console.log(payload[0].payload);
      
      return (
        <div style={{ backgroundColor: "#fff", padding: "10px", border: "1px solid #ccc" }}>
          <p>{`Категория: ${type}`}</p>
          <p>{`Значение: ${value.toFixed(1)}%`}</p>
        </div>
      );
    }
  };

  return (
    <div style={{ padding: "10px" }}>
   
      <div style={{ marginBottom: "20px" }}>
        <h2>Расходы по категориям</h2>
        <div >
        <PieChart width={300} height={350}>
          <Pie
            data={expenseDataCategRsPercentage}
            dataKey="value"
            nameKey="type"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label={({ value }) => `${value.toFixed(1)}%`}
          >
            {expenseDataCategRsPercentage?.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
           layout="horizontal" 
           align="center" 
           verticalAlign="bottom" 
          />
 
        </PieChart>
      </div>
      </div>


      <div>
        <h2>Доходы по категориям</h2>
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center"}}>
        <PieChart width={300} height={350}>
          <Pie
            data={expenseDataCategDsPercentage}
            dataKey="value"
            nameKey="type"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label={({ value }) => `${value.toFixed(1)}%`}
          >
            {expenseDataCategDsPercentage?.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
           layout="horizontal" 
           align="center" 
           verticalAlign="bottom" 
          />
        </PieChart>
      </div>
    </div>
    </div>
  );
};