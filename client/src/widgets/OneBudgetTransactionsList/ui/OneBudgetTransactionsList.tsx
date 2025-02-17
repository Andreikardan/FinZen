import styles from "./OneBudgetTransactionsList.module.css";
import { getBudgetByIdThunk } from "@/entities/budget/api";
import { ITransactionD } from "@/entities/transactionD";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import { useCallback, useEffect, useState } from "react";
import { OneBudgetTransactionCard } from "./OneBudgetTransactionCard/OneBudgetTransactionCard";
import { Button } from "antd";
import { TransactionDForm } from "@/widgets/TransactionDForm/ui/TransactionDForm";
import { TransactionRForm } from "@/widgets/TransactionRForm/ui/TransactionRForm";
import { PlusOutlined } from "@ant-design/icons";

type Props = {
  budgetId: number;
};

export interface ITransactionDsWithCategoryIcon extends ITransactionD {
  category_icon: string;
}

export interface ITransactionRsWithCategoryIcon extends ITransactionD {
  category_icon: string;
}

export type ArrayOfTransactionDsWithCategoryIcon =
  Array<ITransactionDsWithCategoryIcon>;
export type ArrayOfTransactionRsWithCategoryIcon =
  Array<ITransactionRsWithCategoryIcon>;


export function OneBudgetTransactionsList({ budgetId }: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const budget = useAppSelector((state) => state.budget.currentBudget);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isModalVisibleR, setIsModalVisibleR] = useState<boolean>(false);
  const [showAllIncomes, setShowAllIncomes] = useState<boolean>(false);
  const [showAllExpenses, setShowAllExpenses] = useState<boolean>(false);

  const transactionDs: ArrayOfTransactionDsWithCategoryIcon | [] = budget
    ? budget.CategoryDs.flatMap((category) =>
        category.TransactionDs.map((transactionD) => ({
          ...transactionD,
          category_icon: category.icon,
        }))
      ).sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    : [];

  const transactionRs: Array<ITransactionRsWithCategoryIcon> = budget
    ? budget?.CategoryRs.flatMap((category) =>
        category.TransactionRs.map((transactionR) => ({
          ...transactionR,
          category_icon: category.icon,
        }))
      ).sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    : [];

  const displayedIncomes = showAllIncomes
    ? transactionDs
    : transactionDs.slice(0, 3);
  const displayedExpenses = showAllExpenses
    ? transactionRs
    : transactionRs.slice(0, 3);

  useEffect(() => {
    dispatch(getBudgetByIdThunk(budgetId));
  }, [dispatch, budgetId]);

  const refreshTransactions = useCallback(() => {
    dispatch(getBudgetByIdThunk(budgetId));
  }, [dispatch, budgetId]);
  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>{budget?.name}</div>
          <div>{`${budget?.sum} ₽`}</div>
        </div>
        <div className={styles.sectionsContainer}>
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h1>Доходы</h1>
              <div className={styles.buttonContainer}>
                <button
                  className={styles.plusButton}
                  onClick={() => setIsModalVisible(true)}
                >
                 <PlusOutlined />
                </button>
              </div>

            </div>
            <TransactionDForm
              isModalVisible={isModalVisible}
              setIsModalVisible={setIsModalVisible}
              budget={budget}
              refreshTransactions={refreshTransactions}
            />
            <div className={styles.transactionList}>
              {displayedIncomes?.length > 0 ? (
                displayedIncomes.map((el) => (
                  <OneBudgetTransactionCard transaction={el} key={el.id} />
                ))
              ) : (
                <h1 className={styles.noTransactions}>Транзакции не найдены</h1>
              )}
            </div>
            {transactionDs.length > 3 && (
              <Button
                type="link"
                onClick={() => setShowAllIncomes(!showAllIncomes)}
                className={styles.showMoreButton}
              >
                {showAllIncomes ? "Свернуть" : "Развернуть"}
              </Button>
            )}
          </div>
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h1>Расходы</h1>
              <div className={styles.buttonContainer}>
                <button
                  className={styles.plusButton}
                  onClick={() => setIsModalVisibleR(true)}

                >
                  <PlusOutlined />
                </button>
              </div>
            </div>
            <TransactionRForm
              isModalVisibleR={isModalVisibleR}
              setIsModalVisibleR={setIsModalVisibleR}
              budget={budget}
              refreshTransactions={refreshTransactions}
            />
            <div className={styles.transactionList}>
              {displayedExpenses?.length > 0 ? (
                displayedExpenses.map((el) => (
                  <OneBudgetTransactionCard transaction={el} key={el.id} />
                ))
              ) : (
                <h1>Транзакции не найдены</h1>
              )}
            </div>
            {transactionRs.length > 3 && (
              <Button
                type="link"
                onClick={() => setShowAllExpenses(!showAllExpenses)}
                className={styles.showMoreButton}
              >
                {showAllExpenses ? "Свернуть" : "Развернуть"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
