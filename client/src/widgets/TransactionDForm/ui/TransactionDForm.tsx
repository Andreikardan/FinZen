/* eslint-disable @typescript-eslint/ban-ts-comment */
import styles from "./TransactionDForm.module.css";
import { useState } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { Dialog, Input, Popup, Toast, Grid } from "antd-mobile";
import { useAppDispatch } from "@/shared/hooks/reduxHooks";
import { IRawTransactionDData } from "@/entities/transactionD/model";
import { createTransactionDThunk } from "@/entities/transactionD";
import { IOneBudgetTransactions } from "@/entities/budget/model/type";
import { getAllTransactionsThunk, updateBudgetThunk } from "@/entities/budget/api";


type Props = {
  isModalVisible: boolean;
  setIsModalVisible: (value: boolean) => void;
  budget: IOneBudgetTransactions | null;
  refreshTransactions: () => void;
};

export function TransactionDForm({
  isModalVisible,
  setIsModalVisible,
  budget,
  refreshTransactions,
}: Props) {
  const dispatch = useAppDispatch();
  const categoryDs = budget?.CategoryDs;
  const initialInputsState = { description: "", sum: 0, category_id: null };
  const [inputs, setInputs] =
    useState<IRawTransactionDData>(initialInputsState);
  const [visible, setVisible] = useState(false);

  const onChangeHandler = (value: string, name: string) => {
    if (name === "sum") {
      setInputs((prev) => ({ ...prev, [name]: Number(value) }));
    } else {
      setInputs((prev) => ({ ...prev, [name]: value }));
    }
  };

  const onCategorySelect = (categoryId: number) => {
    setInputs((prev) => ({ ...prev, category_id: categoryId }));
    setVisible(false);
  };

  const onCreate = async (data: IRawTransactionDData) => {
    if (!data.category_id || !data.description || !data.sum) {
      Toast.show({
        content: "Заполните все поля",
        position: "bottom",
      });
    } else {
      const resultAction = await dispatch(createTransactionDThunk(data));
      unwrapResult(resultAction);
       await dispatch(getAllTransactionsThunk())
      // dispatch(addNewTransaction(resultAction.payload?.data))
      const updatedBudgetData = {
        name: budget?.name,
        //@ts-ignore
        sum: budget!.sum + data!.sum,
      };
      const resultBudgetAction = await dispatch(
        //@ts-ignore
        updateBudgetThunk({ id: budget!.id, updatedBudget: updatedBudgetData })
      );
      unwrapResult(resultBudgetAction);
      setIsModalVisible(false);
      refreshTransactions();
      Toast.show({
        content: "Операция добавлена",
        position: "bottom",
      });
      setInputs(initialInputsState)

    }
  };

  return (
    <div>
      <Dialog
        visible={isModalVisible}
        title="Добавить операцию"
        content={
          <div>
            <Input
              name="description"
              value={inputs.description}
              onChange={(value) => onChangeHandler(value, "description")}
              placeholder="Описание"
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
            <div className={styles.categoryContainer}>
              {inputs.category_id ? (
                <img

                  src={`${import.meta.env.VITE_IMAGES_API}${
                    categoryDs?.find(
                      (category) => category.id === inputs.category_id
                    )?.icon
                  }`}
                  className={styles.iconItem}
                  style={{ width: "24px", height: "24px", marginRight: "8px" }}
                />
              ) : (
                <div className={styles.emptyIcon}></div>
              )}
              <button
                className={styles.categoryButton}
                onClick={() => setVisible(true)}
              >
                {inputs.category_id
                  ? "Изменить категорию"
                  : "Выбрать категорию"}
              </button>

              <Popup
                visible={visible}
                onMaskClick={() => setVisible(false)}
                position="bottom"
                bodyStyle={{ height: "40vh" }}
              >
                <div className={styles.iconGridContainer}>
                  <Grid columns={3} gap={8}>
                    {categoryDs?.map((category) => (
                      <Grid.Item className={styles.gridItem} key={category.id}>
                        <img
                          src={`${import.meta.env.VITE_IMAGES_API}${category.icon}`}
                          className={styles.iconItem}
                          onClick={() => onCategorySelect(category.id)}
                        />
                        <span className={styles.categoryNames} onClick={() => onCategorySelect(category.id)}>
                          {category.name}
                        </span>
                      </Grid.Item>
                    ))}
                  </Grid>
                </div>
              </Popup>
            </div>
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
            
              onClick: () => onCreate(inputs),
            },
          ],
        ]}
      />
    </div>
  );
}
