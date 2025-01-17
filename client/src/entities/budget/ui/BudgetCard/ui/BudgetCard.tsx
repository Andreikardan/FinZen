import styles from "./BudgetCard.module.css";
import React, { useRef, useState } from "react";
import { DeleteOutlined, EditOutlined, LeftOutlined } from "@ant-design/icons";
import { Dialog, List, SwipeAction, Toast, Input } from "antd-mobile";
import { SwipeActionRef } from "antd-mobile/es/components/swipe-action";
import { useNavigate } from "react-router-dom";
import { IBudget, IRawBudgetData } from "@/entities/budget/model/type";
import { IApiResponseSuccess } from "@/shared/types";
import { useAppDispatch } from "@/shared";
import { deleteBudget } from "@/entities/budget/slice";

type Props = {
  budget: IBudget;
  onDelete: () => Promise<IApiResponseSuccess<IBudget>>;
  onUpdate: (updatedBudget: IRawBudgetData) => void;
};

export const BudgetCard: React.FC<Props> = React.memo(
  ({ budget, onDelete, onUpdate }) => {
    const ref = useRef<SwipeActionRef>(null);
    const navigate = useNavigate();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [updatedBudgetData, setUpdatedBudgetData] = useState({
      name: budget.name,
      sum: budget.sum,
    });
const dispatch = useAppDispatch()
    const onChangeHandler = (value: string, name: string) => {
      setUpdatedBudgetData((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdate = () => {
      onUpdate(updatedBudgetData);
      setIsModalVisible(false);
      Toast.show({
        content: "Бюджет обновлен",
        position: "bottom",
      });
    };

    return (
      <div className={styles.card}>
        <List>
          <SwipeAction
            ref={ref}
            closeOnAction={false}
            closeOnTouchOutside={false}
            rightActions={[
              {
                key: "update",
                text: <EditOutlined className={styles.actionIcon} />,
                color: "warning",

                onClick: async () => {
                  setIsModalVisible(true);
                  ref.current?.close();
                },
              },
              {
                key: "delete",
                text: <DeleteOutlined className={styles.actionIcon} />,
                color: "danger",
                onClick: async () => {
                  await Dialog.confirm({
                    content: "Будем удалять？",
                    confirmText: "Да",
                    async onConfirm() {
                      const result = await onDelete();
                      dispatch(deleteBudget(budget.id))
                      
                      
                      if (result.statusCode === 200) {
                        Toast.show({
                          content: "Бюджет удален",
                          position: "bottom",
                        });
                      } else {
                        Toast.show({
                          content: "Кажется у нас проблемы",
                          position: "bottom",
                        });
                      }
                    },
                    cancelText: "Нет",
                  });
                  ref.current?.close();
                },
              },
            ]}
          >
            <List.Item
              arrow={false}
              className={styles.listItem}
              onClick={() => {
                navigate(`/transaction/${budget.id}`);
              }}
            >
              <div className={styles.swipeHint}>
               <LeftOutlined style={{ fontSize: "20px", color: "var(--primary-light-purple)" }} />
               </div>
              <div className={styles.listItemContent}>
                <span className={styles.listItemName}>{budget.name}</span>
                <span className={styles.listItemSum}>{budget.sum} ₽</span>
              </div>
               
            </List.Item>
          </SwipeAction>
        </List>

        <Dialog
          visible={isModalVisible}
          title="Редактировать бюджет"
          content={
            <div className={styles.modalContent}>
              <Input
                name="name"
                value={updatedBudgetData.name}
                onChange={(value) => onChangeHandler(value, "name")}
                placeholder="Название"
                className={styles.input}
              />
              <Input
                type="number"
                name="sum"
                value={String(updatedBudgetData.sum)}
                onChange={(value) => onChangeHandler(value, "sum")}
                placeholder="Сумма"
                className={styles.input}
              />
            </div>
          }
          actions={[
            [
              {
                key: "cancel",
                text: "Отмена",
                onClick: () => setIsModalVisible(false),
              },
              {
                key: "confirm",
                text: "Сохранить",
                bold: true,
                onClick: handleUpdate,
              },
            ],
          ]}
        />
      </div>
    );
  }
);
