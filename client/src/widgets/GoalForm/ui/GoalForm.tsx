import { unwrapResult } from "@reduxjs/toolkit";
import { message as antMessage } from 'antd'
import React, { useState } from "react";
import { createGoalThunk, IRawGoalData } from "@/entities/goal";
import { useAppDispatch  } from "@/shared/hooks/reduxHooks";


const initialInputsState = {title:"", goal: 0, accumulator: 0}

export const GoalForm: React.FC = () => {
    const [inputs, setInputs] = useState<IRawGoalData>(initialInputsState);
    const dispatch = useAppDispatch();
  
    function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>): void {
      setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    }

    const isEmptyFormData =
      inputs.title.trim().length === 0 ||  !isFinite(inputs.goal) || !isFinite(inputs.accumulator)
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
  
      if (isEmptyFormData) {
        antMessage.error('Все поля обязательны к заполнению');
        return;
      }
  
      const resultAction = await dispatch(createGoalThunk(inputs));
      unwrapResult(resultAction);
      setInputs(initialInputsState);
    };
  
    return (
        <form  onSubmit={handleSubmit}>
          <input
            type='text'
            value={inputs.title}
            name='title'
            onChange={onChangeHandler}
            placeholder='Название цели'
          />
          <input
            type='number'
            value={inputs.goal}
            name='goal'
            onChange={onChangeHandler}
            placeholder='Вся сумма на цель'
          />
        <input
            type='number'
            value={inputs.accumulator}
            name='accumulator'
            onChange={onChangeHandler}
            placeholder='Сумма для изменения'
          />
          <button type="submit">
            Добавь цель
          </button>
        </form>

    );
  };

  export const memorizedGoalForm = React.memo(GoalForm)