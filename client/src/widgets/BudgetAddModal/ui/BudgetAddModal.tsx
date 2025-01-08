import { createBudgetThunk } from "@/entities/budget";
import { IRawBudgetData } from "@/entities/budget/model/type";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import { useBudgetList } from "@/widgets/BudgetList/useBudgetList";
import { unwrapResult } from "@reduxjs/toolkit";
import { Dialog, Input, Toast } from "antd-mobile";
import React, { useState } from "react";

export function BudgetAddModal({ isModalVisible, setIsModalVisible }) {
  // const { budgets } = useBudgetList();
  const dispatch = useAppDispatch()
  const initialInputsState = {name:'',sum:''}
  const [inputs,setInputs] = useState(initialInputsState)

  const onChangeHandler = (value: string, name: string) => {
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const onUpdate =  async (data:IRawBudgetData) =>{
    const resultAction = await dispatch(createBudgetThunk(data))
    unwrapResult(resultAction)
     setIsModalVisible(false);
    Toast.show({
      content: "Бюджет Добавлен",
      position: "bottom",
      icon:'success'
    });
  }
  
  return (
    <div>
      <Dialog
        visible={isModalVisible}
        title="Добавить бюджет"
        content={
          <div>
            <Input
              name="name"
              value={inputs.name}
              onChange={(value) => onChangeHandler(value, "name")}
              placeholder="Название"
            />
            <Input
              type="number"
              name="sum"
              value={String(inputs.sum)}
              onChange={(value) => onChangeHandler(value, "sum")}
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
              text: "Добавить",
              bold: true,
              onClick: ()=>onUpdate(inputs),
            },
          ],
        ]}
      />
    </div>
  );
}
