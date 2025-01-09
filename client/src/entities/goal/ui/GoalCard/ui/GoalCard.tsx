import { IGoal, IRawGoalData } from "@/entities/goal/model";
import { Button } from "antd";
import React, { useState } from "react";

type Props = {
    goal: IGoal;
    onUpdate: (updatedTask: IRawGoalData) => void;
    onDelete: () => void;
  };
  



  export const GoalCard: React.FC<Props> = React.memo(
    ({ goal, onDelete, onUpdate }) => {
      const initialInputsState = { title: goal.title, goal: goal.goal, accumulator: goal.accumulator };
      const [isEditing, setIsEditing] = useState(false);
      const [inputs, setInputs] = useState<IRawGoalData>(initialInputsState);

  
      const isEmptyFormData =
        inputs.title.trim().length === 0 || !isFinite(inputs.goal) || !isFinite(inputs.accumulator);
  
      function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>): void {
        setInputs((prev) => ({
          ...prev,
          [event.target.name]: event.target.value,
        }));
      }
  
      const handleEdit = () => {
        setIsEditing(true);
        setInputs(initialInputsState)
      };
  
      const handleCancel = () => {
        setIsEditing(false);
        setInputs(initialInputsState);
      };
  
      const handleSave = () => {
        if (isEmptyFormData) {
          console.log('Все поля обязательны к заполнению');
          return;
        }
        setIsEditing(false);
        onUpdate(inputs);
        setInputs(initialInputsState);
      };
  
  
      const progressPercentage =   (goal.accumulator / goal.goal) * 100 ;
  
      return (
        <div>
          {isEditing ? (
            <>
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
              <Button onClick={handleSave}>Сохранить</Button>
              <Button onClick={handleCancel}>Закрыть</Button>
            </>
          ) : (
            <>
              <h2>{goal.title}</h2>
              <p>Цель: {goal.goal}</p>
              <p>Накоплено: {goal.accumulator}</p>
              <div style={{ width: '100%', backgroundColor: '#e0e0e0', borderRadius: '5px' }}>
                <div
                  style={{
                    width: `${progressPercentage}%`,
                    height: '20px',
                    backgroundColor: progressPercentage >= 100 ? 'var(--primary-dark-purple)' : 'var(--primary-light-purple)',
                    borderRadius: '5px',
                  }}
                />
              </div>
              {progressPercentage.toFixed() === "100" ?(
                <>
                <p>Молодец, котик</p>
                </>
              ) : (
                <>
                <p>{progressPercentage.toFixed(1)}%</p>
                </>
              )}
              <Button onClick={handleEdit}>Изменить</Button>
              <Button onClick={onDelete}>Удалить</Button>
            </>
          )}
          


        </div>
      );
    }
  );