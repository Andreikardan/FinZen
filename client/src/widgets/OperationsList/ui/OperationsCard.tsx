import styles from "./OperationsCard.module.css";
import { Flex } from "antd";
import { List, Image } from "antd-mobile";
import { IAllTransaction } from "@/entities/transactionR";

type Props = {
  transaction: IAllTransaction;
  setCurrentTransaction: (transaction: IAllTransaction) => void;
  setVisible: (value: boolean) => void;
};

export function OperationsCard({
  transaction,
  setCurrentTransaction,
  setVisible,
}: Props) {

  return (
    <>
      <List.Item
        onClick={() => {
          setCurrentTransaction(transaction);
          setVisible(true);
        }}
        className={styles.card}
      >
        <Flex align="center" justify="between" className={styles.container}>
          <Flex align="center" gap={8} className={styles.leftSection}>
            <Image
              src={`${import.meta.env.VITE_IMAGES_API}${transaction.icon}`}
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
    </>
  );
}
