import styles from './GoalForm.module.css'
import { useState } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { Input } from "antd";
import { Dialog, Toast } from "antd-mobile";
import { createGoalThunk, IRawGoalData } from "@/entities/goal";
import { useAppDispatch } from "@/shared/hooks/reduxHooks";
import { getAllTransactionsThunk } from "@/entities/budget/api";

type Props = {
  isModalVisible: boolean;
  setIsModalVisible: (value: boolean) => void;
};

export function GoalForm({ isModalVisible, setIsModalVisible }: Props) {
  const dispatch = useAppDispatch();
  const initialInputsState = { title: '', goal: null, accumulator: 0 };
  const [inputs, setInputs] = useState<IRawGoalData>(initialInputsState);

  const onChangeHandler = (value: string, name: string) => {
    if (name === "title") {
      
      if (!/^[a-zA-Zа-яА-Я\s]*$/.test(value)) {
        return;
      }
    } else if (name === "goal") {
  
      if (!/^\d*$/.test(value)) {
        return;
      }
    }
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const onUpdate = async (data: IRawGoalData) => {
     
    if (!data.title || !data.goal ) {
      Toast.show({
        content: "Заполните все поля",
        position: "bottom",
      });
      return;
    }

    try {
      const resultAction = await dispatch(createGoalThunk(data));
      unwrapResult(resultAction);
      setInputs(initialInputsState);
    await dispatch(getAllTransactionsThunk())

      setIsModalVisible(false);
      Toast.show({
        content: "Цель добавлена",
        position: "bottom",
      });
    } catch   {
      Toast.show({
        content: "Ошибка при добавлении ",
        position: "bottom",
      });
    }

  };

  return (
    <div>
      <Dialog
        visible={isModalVisible}
        title="Добавить цель"
        content={
          <div>
            <Input
              name="title"
              value={inputs.title}
              onChange={(e) => onChangeHandler(e.target.value, "title")}
              placeholder="Название"
              className={styles.inputs}
            />
            <Input
              type="number"
              name="goal"
              value={inputs.goal !== null ? inputs.goal : ''}
              onChange={(e) => onChangeHandler(e.target.value, "goal")}
              placeholder="Сумма на цель"
              className={styles.inputs}
            />
          

          </div>
        }
        actions={[
          [
            {
              key: "cancel",
              text: "Отмена",
              style: {backgroundColor: 'grey', color: 'white'},
              onClick: () => setIsModalVisible(false),

            },
              
            {
              key: "confirm",
              text: "Добавить",
              style: {backgroundColor: '#6a1b9a', color: 'white'},
              onClick: () => onUpdate(inputs),

            },
             
          ],
        ]}
      />
    </div>
  );
}

