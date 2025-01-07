
import { useBudgetList } from "../useBudgetList";
import { BudgetCard } from "@/entities/budget";
import { IBudget } from "@/entities/budget/model/type";

export function BudgetList(): JSX.Element {
  const { budgets } = useBudgetList();
  return (
    <div>
      <h1>Все бюджеты</h1>
      {budgets.length > 0 ? (
        budgets.map((el: IBudget) => <BudgetCard budget={el} key={el.id} />)
      ) : (
        <h1>Бюджетов пока нет</h1>
      )}
    </div>
  );
}
