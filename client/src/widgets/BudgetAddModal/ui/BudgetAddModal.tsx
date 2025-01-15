import styles from './BudgetAddModal.module.css'
import  { useState } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { Dialog, Input, Toast } from "antd-mobile";
import { createBudgetThunk } from "@/entities/budget";
import { IRawBudgetData } from "@/entities/budget/model/type";
import { useAppDispatch } from "@/shared/hooks/reduxHooks";


type Props = {
  isModalVisible: boolean;
  setIsModalVisible: (value:boolean) => void
} 
export function BudgetAddModal({  setIsModalVisible,isModalVisible }:Props) {
  const dispatch = useAppDispatch()
  const initialInputsState = {name:'',sum:null}
  const [inputs,setInputs] = useState<IRawBudgetData>(initialInputsState)

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
              className={styles.inputs}
            />
            <Input
              type="number"
              name="sum"
              value={String(inputs.sum)}
              onChange={(value) => onChangeHandler(value, "sum")}
              placeholder="Сумма"
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
              onClick: ()=>onUpdate(inputs),
            },
          ],
        ]}
      />
    </div>
  );
}
