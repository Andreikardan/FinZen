import { IRawBudgetData } from "@/entities/budget/model/type";
import { useAppDispatch } from "@/shared/hooks/reduxHooks";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { createBudgetThunk } from "@/entities/budget";
import { unwrapResult } from "@reduxjs/toolkit";
import { Button } from "@/shared/ui/Button";
import React from "react";

const schema = yup.object().shape({
  name: yup.string().required("Назови свой бюджет").trim(),
  sum: yup.number().required("Сумма обязательно"),
});
const BudgetForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IRawBudgetData>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<IRawBudgetData> = async (data) => {
    const resultAction = await dispatch(createBudgetThunk(data));
    unwrapResult(resultAction);
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <input
          type="text"
          placeholder="Название бюджета"
          {...register("name")}
        />
        {errors.name && (
          <span style={{ color: "red" }}>{errors.name.message}</span>
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <input
            type='number'
            placeholder='Сумма'
            {...register('sum')}
          />
          {errors.sum && (
            <span style={{ color: 'red' }}>{'Впиши сумму бюджета'}</span>
          )}
        </div>
        <Button type='submit' color='green'>
          Добавить бюджет
        </Button>
    </form>
  );
};
export const memorizedBudgetForm = React.memo(BudgetForm);