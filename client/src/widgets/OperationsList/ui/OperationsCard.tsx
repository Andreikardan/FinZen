import styles from "./OperationsCard.module.css";
import { useState } from "react";
import { Flex } from "antd";
import { Action } from "antd-mobile/es/components/action-sheet";
import { ActionSheet, Dialog, List, Toast, Image } from "antd-mobile";
import { IAllTransaction } from "@/entities/transactionR";

type Props = {
  transaction: IAllTransaction;
};

export function OperationsCard({ transaction }: Props) {
  const [visible, setVisible] = useState(false);

  const actions: Action[] = [
    { text: `${transaction.description}`, key: "copy" },
    { text: `${transaction.sum}`, key: "edit" },
    {
      text: `Удалить`,
      key: "delete",
      onClick: async () => {
        const result = await Dialog.confirm({
          content: "Что то делаем？",
          confirmText: "Да",
          cancelText: "Нет",
        });
        if (result) {
          setVisible(false);
          Toast.show("Готово");
        }
      },
    },
  ];

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
              <p className={styles.description}>{transaction.description}</p>
              <p className={styles.date}>
                {new Date(transaction.createdAt).toLocaleDateString()}
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
            {transaction.sum} ₽
          </p>
        </Flex>
      </List.Item>

      <ActionSheet
        visible={visible}
        actions={actions}
        onClose={() => setVisible(false)} 
        onAction={() => {
          setVisible(false); 
        }}
      />
    </>
  );
}
