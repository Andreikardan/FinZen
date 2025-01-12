import styles from "./GoalCard.module.css";

import React, { useRef, useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { Input, List, Select } from "antd";
import { IGoal, IRawGoalData } from "@/entities/goal/model";
import { GoalTransactionForm } from "@/widgets/GoalTransactionForm/ui/GoalTransactionForm";
import { IApiResponseSuccess } from "@/shared/types";
import { Dialog, SwipeAction, SwipeActionRef, Toast } from "antd-mobile";
import { useNavigate } from "react-router-dom";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useAppSelector } from "@/shared/hooks/reduxHooks";
import { Option } from "antd/es/mentions";


type Props = {
  goal: IGoal;
  onDelete: () => Promise<IApiResponseSuccess<IGoal>>;
  onUpdate: (updatedBudget: IRawGoalData) => void;
  
};



export const GoalCard: React.FC<Props> = React.memo(
  ({  goal, onDelete, onUpdate}) => {
    const ref = useRef<SwipeActionRef>(null);
    const navigate = useNavigate();

    const budgets = useAppSelector ((state) => state.budget.budgets)

console.log(budgets);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isTransactionFormVisible, setIsTransactionFormVisible] = useState(false);
    const [isBudgetFormVisiblue, setIsBudgetFormVisiblue] = useState(false)
    const [updatedGoalData, setUpdatedGoalData] = useState({
      title: "",
      goal: 0,
      accumulator:0,
    });
    const [selectedBudgetId, setSelectedBudgetId] = useState<number | null>(null);

    const onChangeHandler = (value: string, name: string) => {
      setUpdatedGoalData((prev) => ({ ...prev, [name]: value }));
    };

 

    const handleUpdate = () => {
      onUpdate(updatedGoalData);
      setIsModalVisible(false);
      Toast.show({
        content: "Цель更新илась",
        icon: "success",
        position: "bottom",
      });
    };

    const progressPercentage = goal.goal ? (goal.accumulator / goal.goal) * 100 : 0;

    const handleBudgetSelect = (budgetId: number) => {
      setSelectedBudgetId(budgetId);
      setIsTransactionFormVisible(true);
    };

   

    return (
      <div className={styles.card}>
       <Select
        placeholder="Выберите бюджет"
        onChange={handleBudgetSelect}
        style={{ width: "100%", marginBottom: "10px" }}
      >
        {budgets.map((budget) => (
          <Option key={budget.id} value={budget.id}>
            {budget.name}
            {budget.sum}
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
                key: "add",
                text: <PlusOutlined />,
                color: "success",
                onClick: async () => {
                  setIsTransactionFormVisible(true);  
                },
              },
              {
                key: "budget",
                text: <PlusOutlined />,
                color: "success",
                onClick: async () => {
                  setIsBudgetFormVisiblue(true);  
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
                      if (result.statusCode === 200) {
                        Toast.show({
                          content: "Цель удалена",
                          icon: "success",
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
              className={`${styles.listItem}`}
              onClick={() => {
                navigate(`/goals/${goal.id}`);
              }}
            >
              <div className={styles.listItemContent}>
                <span className={styles.listItemName}>{goal.title}</span>
                <span className={styles.listItemSum}>{goal.goal}</span>
                <span className={styles.listItemSum}>{goal.accumulator}</span>
              </div>
            </List.Item>
          </SwipeAction>
        </List>

        <Dialog
          visible={isModalVisible}
          title="Редактировать бюджет"
          content={
            <div>
              <Input
                name="title"
                value={updatedGoalData.title}
                onChange={(e) => onChangeHandler(e.target.value, "title")}
                placeholder="Название"
              />
               <Input
                name="goal"
                value={updatedGoalData.goal}
                onChange={(e) => onChangeHandler(e.target.value, "goal")}
                placeholder="Сумма"
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
 <div>
      {isBudgetFormVisiblue && (
        budgets.map((budget) => (
          <div key={budget.id} className={styles.budgetItem}>
            <span>{budget.name}</span>
            <span>{budget.sum}</span>
          </div>
        ))
      )}
    </div>
      
        {isTransactionFormVisible && selectedBudgetId &&  (
          <GoalTransactionForm
            accumulator={goal.accumulator}
            goal_id={goal.id}
            sum={budgets.find(b => b.id === selectedBudgetId)?.sum || 0}
            budget_id={selectedBudgetId}
            isModalVisible={isTransactionFormVisible}
            setIsModalVisible={setIsTransactionFormVisible} 
          />
         )}
         
 <ProgressBar
 completed={progressPercentage.toFixed(1)}
 height="15px"
 labelColor="#fff"
 barContainerClassName={styles.container}
 transitionDuration="0.4s"
 />
      </div>
    );
  }
);




