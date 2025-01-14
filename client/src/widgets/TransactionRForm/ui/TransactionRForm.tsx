/* eslint-disable @typescript-eslint/ban-ts-comment */
import styles from "./TransactionRForm.module.css";
import { useState } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { Dialog, Input, Popup, Toast, Grid } from "antd-mobile";
import { useAppDispatch } from "@/shared/hooks/reduxHooks";
import { IRawTransactionRData } from "@/entities/transactionR/model";
import { createTransactionRThunk } from "@/entities/transactionR";
import { IOneBudgetTransactions } from "@/entities/budget/model/type";
import { updateBudgetThunk } from "@/entities/budget/api";

type Props = {
  isModalVisibleR: boolean;
  setIsModalVisibleR: (value: boolean) => void;
  budget: IOneBudgetTransactions | null;
  refreshTransactions: () => void;
};

export function TransactionRForm({
  isModalVisibleR,
  setIsModalVisibleR,
  budget,
  refreshTransactions,
}: Props) {
  const dispatch = useAppDispatch();
  const categoryDs = budget!.CategoryDs;
  const initialInputsState = { description: "", sum: 0, category_id: null };
  const [inputs, setInputs] =
    useState<IRawTransactionRData>(initialInputsState);
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

  const onCreate = async (data: IRawTransactionRData) => {
    if (!budget || !budget.sum) {
      Toast.show({
        content: "Бюджет не найден",
        position: "bottom",
        icon: "fail",
      });
      return;
    }

 
    const updatedBudgetData = {

      name: budget?.name, //@ts-ignore
      sum: budget!.sum - data!.sum,
    };

    if (updatedBudgetData.sum < 0) {
      Toast.show({
        content: "Бюджет не может быть отрицательным",
        position: "bottom",
        icon: "fail",
      });
    } else if (!data.category_id || !data.description || !data.sum) {
      Toast.show({
        content: "Все поля обязательны к заполнению",
        position: "bottom",
        icon: "fail",
      });
    } else {
      const resultAction = await dispatch(createTransactionRThunk(data));
      unwrapResult(resultAction);
      const resultBudgetAction = await dispatch(
        //@ts-ignore
        updateBudgetThunk({ id: budget!.id, updatedBudget: updatedBudgetData })
      );
      unwrapResult(resultBudgetAction);
      setIsModalVisibleR(false);
      refreshTransactions();
      Toast.show({
        content: "Операция добавлена",
        position: "bottom",
        icon: "success",
      });
    }
  };

  return (
    <div>
      <Dialog
        visible={isModalVisibleR}
        title="Добавить операцию"
        content={
          <div>
            <Input
              name="description"
              value={inputs.description}
              onChange={(value) => onChangeHandler(value, "description")}
              placeholder="Описание"
            />
            <Input
              type="number"
              name="sum"
              value={String(inputs.sum)}
              onChange={(value) => onChangeHandler(value, "sum")}
              placeholder="Сумма"
            />
            <div className={styles.categoryContainer}>
              {inputs.category_id ? (
                <img
                  src={
                    categoryDs.find(
                      (category) => category.id === inputs.category_id
                    )?.icon
                  }
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
                    {categoryDs.map((category) => (
                      <Grid.Item key={category.id}>
                        <img
                          src={category.icon}
                          className={styles.iconItem}
                          onClick={() => onCategorySelect(category.id)}
                        />
                        <span onClick={() => onCategorySelect(category.id)}>
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
              onClick: () => setIsModalVisibleR(false),
            },
            {
              key: "confirm",
              text: "Добавить",
              bold: true,
              onClick: () => onCreate(inputs),
            },
          ],
        ]}
      />
    </div>
  );
}
