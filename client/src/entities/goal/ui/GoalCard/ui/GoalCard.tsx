import styles from "./GoalCard.module.css"
import React, { useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { Button } from "antd";
import { IGoal, IRawGoalData } from "@/entities/goal/model";



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
      inputs.title.trim().length === 0 || (!isFinite(inputs.goal)|| null) || (!isFinite(inputs.accumulator)||null);

    function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>): void {
      setInputs((prev) => ({
        ...prev,
        [event.target.name]: event.target.value,
      }));
    }

    const handleEdit = () => {
      setIsEditing(true);
      setInputs(initialInputsState);
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

    const progressPercentage = goal.goal ? (goal.accumulator / goal.goal) * 100: 0;

    return (
      <div className={styles.goalCard} title={isEditing ? "Редактировать цель" : goal.title}>
          
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
            <div style={{ width: '100%', padding: '10px 0' }}>
              <ProgressBar
                completed={progressPercentage.toFixed(1)}
                height="15px"
                labelColor="#fff"
                barContainerClassName={styles.container}
                transitionDuration="0.4s"
                // customLabel="%"
              />
              
            </div>
         <div className={styles.button}>
         <Button onClick={handleEdit}>Изменить</Button>
         <Button onClick={onDelete}>Удалить</Button>
         </div>
           
          </>
        )}
   
      </div>
    
    );
  }
);
