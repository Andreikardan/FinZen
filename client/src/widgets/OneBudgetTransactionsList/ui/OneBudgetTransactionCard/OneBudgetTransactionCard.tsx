import React from 'react';
import styles from './OneBudgetTransactionCard.module.css';
import { List, Image } from 'antd-mobile';
import {
  ITransactionDsWithCategoryIcon,
  ITransactionRsWithCategoryIcon,
} from "../OneBudgetTransactionsList";
import { Flex } from 'antd';

interface OneBudgetTransactionCardProps {
  transaction: ITransactionDsWithCategoryIcon | ITransactionRsWithCategoryIcon;
}

export const OneBudgetTransactionCard: React.FC<OneBudgetTransactionCardProps> = ({ transaction }) => {
  return (
    <List.Item>
      <Flex align="center" justify="between">
        <Flex align="center" gap={8}>
          <Image
            src={transaction.category_icon}
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
        <p className={styles.sum}>{transaction.sum} ₽</p>
      </Flex>
    </List.Item>
  );
};





// import styles from './OneBudgetTransactionCard.module.css'
// import {
//   ITransactionDsWithCategoryIcon,
//   ITransactionRsWithCategoryIcon,
// } from "../OneBudgetTransactionsList";

// interface OneBudgetTransactionCardProps {
//   transaction: ITransactionDsWithCategoryIcon | ITransactionRsWithCategoryIcon;
// }

// export const OneBudgetTransactionCard: React.FC<
//   OneBudgetTransactionCardProps
// > = ({ transaction }) => {
//   return (
//     <div>
//       <img src={transaction.category_icon} alt="категория транзакции" />
//       <div>
//         <p>{transaction.description}</p>
//         <p>{new Date(transaction.createdAt).toLocaleDateString()}</p>
//       </div>

//       <p>{transaction.sum} ₽</p>
//     </div>
//   );
// };