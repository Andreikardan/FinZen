import styles from "./GoalCard.module.css";
import React, { useRef, useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { Input, List, Select } from "antd";
import { IGoal, IRawGoalData } from "@/entities/goal/model";
import { GoalTransactionForm } from "@/widgets/GoalTransactionForm/ui/GoalTransactionForm";
import { IApiResponseSuccess } from "@/shared/types";
import { Dialog, SwipeAction, SwipeActionRef, Toast } from "antd-mobile";
import { DeleteOutlined, EditOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useAppSelector } from "@/shared/hooks/reduxHooks";
import { Option } from "antd/es/mentions";

type Props = {
  goal: IGoal;
  onDelete: () => Promise<IApiResponseSuccess<IGoal>>;
  onUpdate: (updatedBudget: IRawGoalData) => void;
};

export const GoalCard: React.FC<Props> = React.memo(
  ({ goal, onDelete, onUpdate }) => {
    const ref = useRef<SwipeActionRef>(null);
    const budgets = useAppSelector((state) => state.budget.budgets);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isTransactionFormVisible, setIsTransactionFormVisible] = useState(false);
    const [isBudgetFormVisiblue] = useState(false);
    const [updatedGoalData, setUpdatedGoalData] = useState({
      title: "",
      goal: null,
      accumulator: null,
    });
    const [selectedBudgetId, setSelectedBudgetId] = useState<number | null>(null);

    const onChangeHandler = (value: string, name: string) => {
      if (name === "title") {
        if (!/^[a-zA-Zа-яА-Я\s]*$/.test(value)) {
          return;
        }
      }
      setUpdatedGoalData((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdate = () => {
      // if (!updatedGoalData.title || updatedGoalData.goal === null) {
      //   Toast.show({
      //     content: "Заполните все поля",
      //     position: "bottom",
      //   });
      //   return;
      // }

      const updatedData = {
        ...updatedGoalData,
        goal: updatedGoalData.goal ? Number(updatedGoalData.goal) : null,
        accumulator: updatedGoalData.accumulator ? Number(updatedGoalData.accumulator) : null,
      };
      onUpdate(updatedData);
      setIsModalVisible(false);
      Toast.show({
        content: "Цель изменилась",
        position: "bottom",
      });
    };

    const handleBudgetSelect = (budgetId: number) => {
      if (selectedBudgetId === budgetId) {
        setSelectedBudgetId(null);
      } else {
        setSelectedBudgetId(budgetId);
      }
      setIsTransactionFormVisible(true);
      setIsModalVisible(false);
    };

    const resetState = () => {
      setUpdatedGoalData({
        title: "",
        goal: null,
        accumulator: null,
      });
      setSelectedBudgetId(null);
    };

    const progressPercentage =
      goal.goal !== null && goal.accumulator !== null ? (goal.accumulator / goal.goal) * 100 : 0;

    const progressColor =
      progressPercentage >= 100 ? "var(--primary-dark-purple)" : "var(--primary-light-purple)";

    return (
      <div className={styles.card}>
      
      

        <Select
          placeholder="Выберите бюджет"
          onChange={handleBudgetSelect}
          value={selectedBudgetId}
          style={{ width: "100%", marginBottom: "10px", fontWeight: "bolder", color: "#333" }}
          className={styles.noFocusBorder}
        >
          {budgets.map((budget) => (
            <Option key={budget.id.toString()} value={budget.id.toString()}>
              {budget.name} - {budget.sum}
            </Option>
          ))}
        </Select>
        <List>
          <SwipeAction
            ref={ref}
            closeOnAction={false}
            closeOnTouchOutside={false}
            rightActions={[
              {
                key: "update",
                text: <EditOutlined />,
                color: "warning",
                onClick: async () => {
                  setIsModalVisible(true);
                  ref.current?.close();
                },
              },
              {
                key: "delete",
                text: <DeleteOutlined />,
                color: "danger",
                onClick: async () => {
                  await Dialog.confirm({
                    content: "Будем удалять？",
                    confirmText: "Да",
                    async onConfirm() {
                      const result = await onDelete();
                      console.log(result);

                      if (result && result.statusCode === 200) {
                        setIsModalVisible(false);
                        Toast.show({
                          content: "Цель удалена",
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
            <List.Item>
            <div className={styles.swipeHint}>
          <LeftOutlined style={{ fontSize: "20px", color: "var(--primary-light-purple)" }} />
         
           </div>
              <div className={styles.listItemContent}>
                <div>
                  <span className={styles.listItemLabel}>Цель:</span>
                  <span className={styles.listItemValue}>{goal.title}</span>
                </div>
                <div>
                  <span className={styles.listItemLabel}>Сумма цели:</span>
                  <span className={styles.listItemValue}>{goal.goal}</span>
                </div>
                <div>
                  <span className={styles.listItemLabel}>Внесено:</span>
                  <span className={styles.listItemValue}>{goal.accumulator}</span>
                </div>
              </div>
            </List.Item>
          </SwipeAction>
        </List>

        <Dialog
          visible={isModalVisible}
          title="Редактировать цель"
          content={
            <div>
              <Input
                name="title"
                value={updatedGoalData.title}
                onChange={(e) => onChangeHandler(e.target.value, "title")}
                placeholder="Новое название"
              />
              <Input
                name="goal"
                value={updatedGoalData.goal !== null ? updatedGoalData.goal : ""}
                onChange={(e) => onChangeHandler(e.target.value, "goal")}
                placeholder="Сумма"
                type="number"
              />
            </div>
          }
          actions={[
            [
              {
                key: "cancel",
                text: "Отмена",
                onClick: () => setIsModalVisible(false),
                style: {
                  color: "#fff",
                  backgroundColor: "var(--primary-light-purple)",
                  padding: "8px 16px",
                },
              },
              {
                key: "confirm",
                text: "Сохранить",
                bold: true,
                onClick: handleUpdate,
                style: {
                  color: "#fff",
                  backgroundColor: "var(--primary-light-purple)",
                  padding: "8px 16px",
                },
              },
            ],
          ]}
        />

        {isBudgetFormVisiblue &&
          budgets.map((budget) => (
            <div key={budget.id} className={styles.budgetItem}>
              <span>{budget.name}</span>
              <span>{budget.sum}</span>
            </div>
          ))}

        {isTransactionFormVisible && selectedBudgetId && (
          <GoalTransactionForm
            accumulator={goal.accumulator}
            goal_id={goal.id}
            goal={goal.goal}
            sum={budgets.find((el) => el.id === +selectedBudgetId)?.sum || 0}
            budget_id={+selectedBudgetId}
            isModalVisible={isTransactionFormVisible}
            setIsModalVisible={(el) => {
              setIsTransactionFormVisible(el);
              if (!el) {
                resetState();
              }
            }}
          />
        )}

        <ProgressBar
          completed={progressPercentage.toFixed(1)}
          height="25px"
          labelColor="#fff"
          bgColor={progressColor}
          barContainerClassName={styles.container}
          transitionDuration="0.4s"
          customLabel={`${progressPercentage.toFixed(1)}%`}
        />
      </div>
    );
  }
);


