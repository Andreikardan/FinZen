import styles from "./BudgetList.module.css"; 
import { useBudgetList } from "../useBudgetList";
import { BudgetCard } from "@/entities/budget";
import { IBudget } from "@/entities/budget/model/type";

export function BudgetsList(): JSX.Element {
  const { budgets, deleteBudget, updateBudget } = useBudgetList();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Все бюджеты</h1>

      <div className={styles.list}>
        {budgets.length > 0 ? (
          budgets.map((el: IBudget) => (
            <BudgetCard
              budget={el}
              key={el.id}
              onDelete={() => deleteBudget(el.id)}
              onUpdate={(updatedBudget) => updateBudget(el.id, updatedBudget)}
            />
          ))
        ) : (
          <p className={styles.emptyMessage}>Бюджетов пока нет</p>
        )}
      </div>
    </div>
  );
}