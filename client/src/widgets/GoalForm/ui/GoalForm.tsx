import { useState } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { Input } from "antd";
import { Dialog, Toast } from "antd-mobile";
import { createGoalThunk, IRawGoalData } from "@/entities/goal";
import { useAppDispatch } from "@/shared/hooks/reduxHooks";


type Props = {
  isModalVisible: boolean;
  setIsModalVisible: (value: boolean) => void;
};

export function GoalForm({ isModalVisible, setIsModalVisible }: Props) {
  const dispatch = useAppDispatch();
  const initialInputsState = { title: '', goal: 0, accumulator: 0 };
  const [inputs, setInputs] = useState<IRawGoalData>(initialInputsState);

  const onChangeHandler = (value: string, name: string) => {
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const onUpdate = async (data: IRawGoalData) => {
    const resultAction = await dispatch(createGoalThunk(data));
    unwrapResult(resultAction);
    setIsModalVisible(false);
    Toast.show({
      content: "Цель добавлена",
      position: "bottom",
      icon: 'success'
    });
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
            />
            <Input
              type="number"
              name="goal"
              value={inputs.goal !== null ? inputs.goal : ''}
              onChange={(e) => onChangeHandler(e.target.value, "goal")}
              placeholder="Сумма на цель"
            />
            <Input
              type="number"
              name="accumulator"
              value={inputs.accumulator !== null ? inputs.accumulator : ''}
              onChange={(e) => onChangeHandler(e.target.value, "accumulator")}
              placeholder="Сумма добавления"
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
              onClick: () => onUpdate(inputs),
            },
          ],
        ]}
      />
    </div>
  );
}

