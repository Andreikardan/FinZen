import styles from "./BudgetList.module.css";
import { useBudgetList } from "../useBudgetList";
import { BudgetCard } from "@/entities/budget";
import { IBudget } from "@/entities/budget/model/type";
import { BudgetCardSkeleton } from "@/entities/budget/ui/BudgetCard/BudgetCardSkeleton/BudgetCardSkeleton";
import { useAppSelector } from "@/shared/hooks/reduxHooks";

export function BudgetsList(): JSX.Element {
  const { budgets, deleteBudget, updateBudget } = useBudgetList();
  const { loading } = useAppSelector((state) => state.budget);
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Все бюджеты</h1>
  
      <div className={styles.list}>
        {loading ? (
          <>
            <BudgetCardSkeleton />
            <BudgetCardSkeleton />
            <BudgetCardSkeleton />
            <BudgetCardSkeleton />
            <BudgetCardSkeleton />
            <BudgetCardSkeleton />
            <BudgetCardSkeleton />
            <BudgetCardSkeleton />
          </>
        ) : budgets.length === 0 ? (
          <p className={styles.emptyMessage}>Бюджетов пока нет</p>
        ) : (
          budgets.map((el: IBudget) => (
            <BudgetCard
              budget={el}
              key={el.id}
              onDelete={() => deleteBudget(el.id)}
              onUpdate={(updatedBudget) => updateBudget(el.id, updatedBudget)}
            />
          ))
        )}
      </div>
    </div>
  );
}
