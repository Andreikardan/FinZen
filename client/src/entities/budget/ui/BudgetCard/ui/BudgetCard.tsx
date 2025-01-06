import { IBudget } from "@/entities/budget/model/type";
import React from "react";

type Props = {
  budget: IBudget;
};
export const BudgetCard: React.FC<Props> = React.memo(({ budget }) => {
  return (
    <div>
      <h1>{budget.name}</h1>
      <h2>{budget.sum} </h2>
      <h3>{budget.user_id}</h3>
    </div>
  );
});
