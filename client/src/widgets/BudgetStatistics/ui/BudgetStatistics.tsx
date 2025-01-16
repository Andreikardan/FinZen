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

  const COLORS = [
    "var(--primary-blue)",
    "var(--primary-purple)",
    "var(--primary-light-purple)",
    "rgb(106, 27, 154)",
    "rgb(64, 224, 208)",
    "rgb(255, 127, 80)",
    "rgb(113, 3, 113)",
    "rgb(128, 128, 128)",
    "rgb(191, 191, 212)",
    "var(--primary-blue-1)",
    "rgb(218, 112, 214)",
  ];

  // const CustomTooltip = ({ active, payload }: any) => {
  //   if (active && payload && payload.length) {
  //     const { type, value } = payload[0].payload;
  //     return (
  //       <div
  //         style={{
  //           backgroundColor: "#fff",
  //           padding: "8px",
  //           border: "1px solid #ccc",
  //           borderRadius: "4px",
  //           fontSize: "10px",
  //         }}
  //       >
  //         <p style={{ margin: "0", fontWeight: "bold" }}>{`Категория: ${type}`}</p>
  //         <p style={{ margin: "0" }}>{`Значение: ${value.toFixed(1)}%`}</p>
  //       </div>
  //     );
  //   }
  //   return null;
  // };

  return (
    <div style={{ padding: "10px", textAlign: "center" }}>
       
      <div style={{ marginBottom: "40px" }}>
        <h2 style={{ fontSize: "20px", marginBottom: "20px" }}>Расходы по категориям</h2>
        <div style={{ display: "flex", justifyContent: "center" }}>
        <PieChart
  width={330}
  height={550}
  style={{
    marginTop: '-150px',
    filter: 'drop-shadow(0 0 5px rgba(106, 27, 154, 0.5))', 
  }}
>
  <Pie
    data={expenseDataCategRsPercentage}
    dataKey="value"
    nameKey="type"
    cx="50%"
    cy="50%"
    outerRadius={100}
    fill="#8884d8"
    labelLine={{ stroke: "black", strokeWidth: 1 }}
    label={({ value }) => `${value.toFixed(1)}%`}
    
  >
    {expenseDataCategRsPercentage?.map((_, index) => (
      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
    ))}
  </Pie>
            {/* <Tooltip content={<CustomTooltip />} /> */}
            <Legend
                layout="centric"
                align="center"
                 style={{
                  paddingTop: "20px",
                  fontSize: "14px",
                }}
 
/>
          </PieChart>
        </div>
      </div>

    
      <hr style={{ border: "1px solid #ddd", margin: "20px 0" }} />

      
      <div>
        <h2 style={{ fontSize: "20px", marginBottom: "20px" }}>Доходы по категориям</h2>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <PieChart width={300} height={580} style={{ marginTop: '-150px' }}>
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
            {/* <Tooltip content={<CustomTooltip />} /> */}
            <Legend
              layout="centric"
              align="center"
              verticalAlign="bottom"
            />
          </PieChart>
        </div>
      </div>
    </div>
  );
};