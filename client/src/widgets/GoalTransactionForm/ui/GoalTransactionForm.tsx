
import { updateBudgetThunk } from "@/entities/budget/api";
import { updateGoalThunk } from "@/entities/goal/api"; 
import { createGoalTransactionThunk, IRawGoalTransactionData } from "@/entities/goalTransaction";
import { useAppDispatch } from "@/shared";
import { useAppSelector } from "@/shared/hooks/reduxHooks";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { unwrapResult } from "@reduxjs/toolkit";
import { Input, Tooltip } from "antd";
import { Dialog, Toast } from "antd-mobile";
import { useState } from "react";


type Props = {
  isModalVisible: boolean;
  setIsModalVisible: (value: boolean) => void;
  goal_id: number; 
  budget_id: number
  accumulator:number |null;
  sum: number 
  goal:number |null

};

export function GoalTransactionForm({ isModalVisible, 
  setIsModalVisible, 
  goal_id, 
  accumulator, 
  budget_id, 
  sum,
  goal,
  }: Props) {



  const dispatch = useAppDispatch();
  const initialInputsState = {sumGoal: ""};
  const [inputs, setInputs] = useState<IRawGoalTransactionData>(initialInputsState);
 const{budgets} = useAppSelector((state)=> state.budget)
 const{goals} = useAppSelector((state) => state.goal)
 const currentBudget = budgets.find((el) => el.id === budget_id)
 const currentGoal = goals.find((el) => el.id === goal_id)

  const onChangeHandler = (value: string, name: string) => {
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const onUpdate = async (sumGoal: string, goal_id: number, budget_id:number) => {
    const sumGoalNumber = +sumGoal;

    if (accumulator === null || goal === null) {
      Toast.show({
        content: "Некорректные данные цели",
        position: "bottom",
      });
      return;
    }

try {
  const resultTransactionAction = await dispatch(createGoalTransactionThunk({sumGoal, goal_id, budget_id}));
  unwrapResult(resultTransactionAction);
 
} catch (error) {
  console.error("Ошибка", error);
  return; 
}


if(!currentBudget){
  return 
}


const updatedGoalData = {
  accumulator: accumulator + sumGoalNumber,
  title: currentGoal?.title || "", 
  goal: currentGoal?.goal || null,
};


if (updatedGoalData.accumulator > goal) {
  Toast.show({
    content: "Вложение не должно превышать цель",
    position: "bottom",
  });
  return;
}

try {
 
  const resultGoalAction = await dispatch(
    updateGoalThunk({ id: goal_id, updatedGoal: updatedGoalData })
  );
  unwrapResult(resultGoalAction);


  const updatedBudgetData = { sum: sum - sumGoalNumber, name: currentBudget.name };
  const resultBudgetAction = await dispatch(
    updateBudgetThunk({ id: +budget_id, updatedBudget: updatedBudgetData })
  );
  unwrapResult(resultBudgetAction);


  setIsModalVisible(false);
  Toast.show({
    content: "Сумма добавлена и цель обновлена",
    position: "bottom",
  });
} catch {
  
  Toast.show({
    content: "Ошибка при обновлении данных",
    position: "bottom",
  });
}
};




  return (
    <div>
      <Dialog
        visible={isModalVisible}
        title="Добавить сумму"
        content={
          <div>
            <Input
              type="string"
              name="sumGoal"
              value={inputs.sumGoal !== null ? inputs.sumGoal : ''}
              onChange={(e) => onChangeHandler(e.target.value, "sumGoal")}
              placeholder="Сумма на цель"
              suffix={
                <Tooltip
                  title="Введите сумму, которую хотите добавить к цели."
               
                  placement="top"
                  color="var(--primary-light-purple)"
                  overlayStyle={{
                  
                    padding: "12px",
                    maxWidth: "200px",
                    
                  }}
                  
                >
                  <QuestionCircleOutlined style={{ color: "rgba(0, 0, 0, 0.45)" }} />
                </Tooltip>
              }
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
                // border: "1px solid var(--primary-dark-purple)",    
                padding: "8px 16px", 
              },
            },
            {
              key: "confirm",
              text: "Добавить",
              bold: true,
              onClick: () => onUpdate(inputs.sumGoal,goal_id, budget_id),
              style: { 
                color: "#fff",  
                backgroundColor: "var(--primary-light-purple)",  
                // border: "1px solid var(--primary-dark-purple)",  
                padding: "8px 16px", 
              },
            },
          ],
        ]}
      />
    </div>
  );
}
