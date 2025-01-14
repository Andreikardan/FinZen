import styles from "./OperationsCard.module.css";
import { useState } from "react";
import { Flex } from "antd";
import { List, Image } from "antd-mobile";
import { IAllTransaction } from "@/entities/transactionR";
import { PopupTransactionPage } from "./PopupTransactionPage/PopupTransactionPage";

type Props = {
  transaction: IAllTransaction;
};

export function OperationsCard({ transaction }: Props) {
  const [visible, setVisible] = useState<boolean>(false);
  console.log(transaction.icon);

  return (
    <>
      <List.Item onClick={() => setVisible(true)} className={styles.card}>
        <Flex align="center" justify="between" className={styles.container}>
          <Flex align="center" gap={8} className={styles.leftSection}>
            <Image
              src={`http://localhost:3000/static/images/${transaction.icon}`}
              alt="категория транзакции"
              width={32}
              height={32}
              className={`${styles.categoryIcon} ${styles[transaction.type]}`} 
            />
            <div className={styles.textContainer}>
              {transaction.type !== "перевод" ? (
                <p className={styles.description}>{transaction.description}</p>
              ) : (
                <p className={styles.description}>
                  {`Из: ${transaction.budgetName} → На цель: ${transaction.goalTitle}`}
                </p>
              )}
              <p className={styles.date}>
                {new Date(transaction.createdAt).toLocaleString("ru-RU", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </Flex>

          <p
            className={styles.sum}
            style={{
              color:
                transaction.type === "трата"
                  ? "var(--transactionR-sum-color)"
                  : transaction.type === "доход"
                  ? "var(--transactionD-sum-color)"
                  : "var(--transactionP-sum-color)",
            }}
          >
            {transaction.type !== "перевод"
              ? `${transaction.sum} ₽`
              : `${transaction.sumGoal} ₽`}
          </p>
        </Flex>
      </List.Item>

      <PopupTransactionPage
        transaction={transaction}
        visible={visible}
        setVisible={setVisible}
      />
    </>
  );
}
