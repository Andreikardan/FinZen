import styles from "./OneBudgetTransactionsList.module.css";
import { getBudgetByIdThunk } from "@/entities/budget/api";
import { ITransactionD } from "@/entities/transactionD";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import { useEffect } from "react";
import { OneBudgetTransactionCard } from "./OneBudgetTransactionCard/OneBudgetTransactionCard";

type Props = {
  budgetId: number;
};

export interface ITransactionDsWithCategoryIcon extends ITransactionD {
  category_icon: string;
}

export interface ITransactionRsWithCategoryIcon extends ITransactionD {
  category_icon: string;
}

export type ArrayOfTransactionDsWithCategoryIcon = Array<ITransactionDsWithCategoryIcon>
export type ArrayOfTransactionRsWithCategoryIcon = Array<ITransactionRsWithCategoryIcon>

export function OneBudgetTransactionsList({ budgetId }: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const budget = useAppSelector((state) => state.budget.currentBudget);

  const transactionDs: ArrayOfTransactionDsWithCategoryIcon  =
    budget?.CategoryDs.flatMap((category) =>
      category.TransactionDs.map((transactionD) => ({
        ...transactionD,
        category_icon: category.icon,
      }))
    );

  const transactionRs: Array<ITransactionRsWithCategoryIcon>  =
    budget?.CategoryRs.flatMap((category) =>
      category.TransactionRs.map((transactionR) => ({
        ...transactionR,
        category_icon: category.icon,
      }))
    );


  useEffect(() => {
    dispatch(getBudgetByIdThunk(budgetId));
  }, [dispatch]);

  return (<>
  <div className={styles.container}>
  <div>{budget?.name}</div>
  <div>
  <h1>Доходы</h1>
  {transactionDs?.length > 0 ? (
    transactionDs.map((el) => (
        <OneBudgetTransactionCard transaction={el} key={el.id}/>
    ) )
  ):(<h1>Транзакции не найдены</h1>)}
  </div>
  <div>
  <h1>Расходы</h1>
  {transactionRs?.length > 0 ? (
    transactionRs.map((el) => (
        <OneBudgetTransactionCard transaction={el} key={el.id}/>
    ) )
  ):(<h1>Транзакции не найдены</h1>)}
  </div>
  </div>
  </>)
}



