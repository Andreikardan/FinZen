import React from "react";
import styles from "./OneBudgetTransactionCard.module.css";
import { List, Image } from "antd-mobile";
import {
  ITransactionDsWithCategoryIcon,
  ITransactionRsWithCategoryIcon,
} from "../OneBudgetTransactionsList";
import { Flex } from "antd";

interface OneBudgetTransactionCardProps {
  transaction: ITransactionDsWithCategoryIcon | ITransactionRsWithCategoryIcon;
}

export const OneBudgetTransactionCard: React.FC<
  OneBudgetTransactionCardProps
> = ({ transaction }) => {
  return (
    <List.Item style={{ marginTop: "-10px", width:300  }}>
      <Flex className={styles.container} align="center" justify="between">
        <Image
          src={`http://localhost:3000/static/images/${transaction.category_icon}`}
          alt="категория транзакции"
          width={32}
          height={32}
          className={
            transaction.type === "доход"
              ? styles.categoryIconD
              : styles.categoryIconR
          }
        />

        <Flex
          align="flex-start"
          justify="center"
          className={styles.descriptionBlock}
        >
          <p className={styles.description}>{transaction.description}</p>
          <p className={styles.date}>
            {new Date(transaction.createdAt).toLocaleString("ru-RU", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </Flex>

        <p className={transaction.type === "доход" ? styles.sumD : styles.sumR}>
          {transaction.sum} ₽
        </p>
      </Flex>
    </List.Item>
  );
};
