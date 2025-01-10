import styles from "./OneBudgetTransactionsList.module.css";
import { getBudgetByIdThunk } from "@/entities/budget/api";
import { ITransactionD } from "@/entities/transactionD";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import { useEffect, useState } from "react";
import { OneBudgetTransactionCard } from "./OneBudgetTransactionCard/OneBudgetTransactionCard";
import { Button, Space } from "antd";
import { PlusSquareOutlined } from "@ant-design/icons";
import { TransactionDForm } from "@/widgets/TransactionDForm/ui/TransactionDForm";

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

  const transactionDs: ArrayOfTransactionDsWithCategoryIcon =
    budget?.CategoryDs.flatMap((category) =>
      category.TransactionDs.map((transactionD) => ({
        ...transactionD,
        category_icon: category.icon,
      }))
    );

  const transactionRs: Array<ITransactionRsWithCategoryIcon> =
    budget?.CategoryRs.flatMap((category) =>
      category.TransactionRs.map((transactionR) => ({
        ...transactionR,
        category_icon: category.icon,
      }))
    );

  useEffect(() => {
    dispatch(getBudgetByIdThunk(budgetId));
  }, [dispatch]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>{budget?.name}</div>
          <div>{`${budget?.sum} ₽`} </div>
        </div>
        <div>
          <div className={styles.income}>
            <h1>Доходы</h1>
            <div className={styles.buttonContainer}>
              <Button
                color="var(--primary-light-purple)"
                onClick={() => setIsModalVisible(true)}
              >
                <Space>
                  <PlusSquareOutlined style={{ fontSize: "22px" }} />
                </Space>
              </Button>
            </div>
            {isModalVisible && (
              <TransactionDForm
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
                budget={budget}
              />
            )}
          </div>

          {transactionDs?.length > 0 ? (
            transactionDs.map((el) => (
              <OneBudgetTransactionCard transaction={el} key={el.id} />
            ))
          ) : (
            <h1>Транзакции не найдены</h1>
          )}
        </div>
        <div>
          <h1>Расходы</h1>
          {transactionRs?.length > 0 ? (
            transactionRs.map((el) => (
              <OneBudgetTransactionCard transaction={el} key={el.id} />
            ))
          ) : (
            <h1>Транзакции не найдены</h1>
          )}
        </div>
      </div>
    </>
  );
}
