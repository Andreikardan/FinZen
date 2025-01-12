
import { updateBudgetThunk } from "@/entities/budget/api";
import { updateGoalThunk } from "@/entities/goal/api"; 
import { createGoalTransactionThunk, IRawGoalTransactionData } from "@/entities/goalTransaction";
import { useAppDispatch } from "@/shared";
import { unwrapResult } from "@reduxjs/toolkit";
import { Input } from "antd";
import { Dialog, Toast } from "antd-mobile";
import { useState } from "react";


type Props = {
  isModalVisible: boolean;
  setIsModalVisible: (value: boolean) => void;
  goal_id: number; 
  budget_id: number
  accumulator:number;
  sum: number
};

export function GoalTransactionForm({ isModalVisible, setIsModalVisible, goal_id, accumulator, budget_id, sum }: Props) {
  const dispatch = useAppDispatch();
  const initialInputsState = {sumGoal: 0};
  const [inputs, setInputs] = useState<IRawGoalTransactionData>(initialInputsState);

  console.log(budget_id, 1111111);
  console.log(goal_id, 11222);
  const onChangeHandler = (value: string, name: string) => {
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const onUpdate = async (sumGoal: number, goal_id: number, budget_id:number) => {
    

      const resultTransactionAction = await dispatch(createGoalTransactionThunk({sumGoal, goal_id, budget_id}));
      unwrapResult(resultTransactionAction);
console.log(sumGoal, goal_id, budget_id, 297867545);

   
     const updatedGoalData = { accumulator: +accumulator + +sumGoal }; 

     const updatedBudgetData = { sum: +sum + +sumGoal }; 
   console.log(updateBudgetThunk, 12324354);
   
      const resultGoalAction = await dispatch(updateGoalThunk({ id: goal_id, updatedGoal: updatedGoalData }));
      unwrapResult(resultGoalAction);

      const resultBudgetAction = await dispatch(updateBudgetThunk({ id: budget_id, updatedBudget: updatedBudgetData }));
       unwrapResult(resultBudgetAction);


      setIsModalVisible(false);
      Toast.show({
        content: "Сумма добавлена и цель обновлена",
        position: "bottom",
        icon: 'success'
      });
    
  };

  return (
    <div>
      <Dialog
        visible={isModalVisible}
        title="Добавить сумму"
        content={
          <div>
            <Input
              type="number"
              name="sumGoal"
              value={inputs.sumGoal !== null ? inputs.sumGoal : ''}
              onChange={(e) => onChangeHandler(e.target.value, "sumGoal")}
              placeholder="Сумма на цель"
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
              text: "Добавить",
              bold: true,
              onClick: () => onUpdate(inputs.sumGoal,goal_id, budget_id),
            },
          ],
        ]}
      />
    </div>
  );
}
