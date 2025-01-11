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

  // const actions: Action[] = [
  //   { text: `${transaction.description}`, key: "copy" },
  //   { text: `${transaction.sum}`, key: "edit" },
  //   {
  //     text: `Удалить`,
  //     key: "delete",
  //     onClick: async () => {
  //       const result = await Dialog.confirm({
  //         content: "Что то делаем？",
  //         confirmText: "Да",
  //         cancelText: "Нет",
  //       });
  //       if (result) {
  //         setVisible(false);
  //         Toast.show("Готово");
  //       }
  //     },
  //   },
  // ];
  console.log(transaction.TransactionComments, 555);

  return (
    <>
      <List.Item onClick={() => setVisible(true)}>
        <Flex align="center" justify="between" style={{ width: "90vw" }}>
          <Flex align="center" gap={8}>
            <Image
              src={transaction.icon}
              alt="категория транзакции"
              width={32}
              height={32}
              className={styles.categoryIcon}
            />
            <div>
              {transaction.type !== "перевод" ? (
                <p className={styles.description}>{transaction.description}</p>
              ) : (
                <p
                  className={styles.description}
                >{`${transaction.budgetName}-->${transaction.goalTitle}`}</p>
              )}
              <p className={styles.date}>
                {new Date(transaction.createdAt).toLocaleTimeString()}
              </p>
            </div>
          </Flex>
          <p
            className={styles.sum}
            style={{
              color:
                transaction.type === "трата"
                  ? "red"
                  : transaction.type === "доход"
                  ? "green"
                  : "blue",
            }}
          >
            {transaction.type !== "перевод"
              ? transaction.sum
              : transaction.sumGoal}{" "}
            ₽
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
