import styles from "./BudgetsPage.module.css";
import { useState } from "react";
import { Space, Button } from "antd";
import { PlusSquareOutlined } from "@ant-design/icons";
import { BudgetAddModal } from "@/widgets/BudgetAddModal";
import { BudgetsList } from "@/widgets/BudgetsList";
import { IRawBudgetData } from "@/entities/budget/model/type";
import { createBudgetThunk } from "@/entities/budget";
import { unwrapResult } from "@reduxjs/toolkit";
import { Toast } from "antd-mobile";
import { useAppDispatch } from "@/shared";

export function BudgetsPage() {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
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
    <div className={styles.container}>
      <BudgetsList />

      <div className={styles.buttonContainer}>
        <Button
          type="primary"
          className={styles.addButton}
          onClick={() => setIsModalVisible(true)}
        >
          <Space>
            <PlusSquareOutlined className={styles.addIcon} />
          </Space>
        </Button>
      </div>

      
        <BudgetAddModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
        />
      
    </div>
  );
}
