import React from 'react';
import { useGoalList } from '../useGoalList';
import { IGoal } from '@/entities/goal';
import { GoalCard } from '@/entities/goal/ui/GoalCard';

export function GoalList(): JSX.Element {
  const { goals, deleteGoal, updateGoal } = useGoalList();

  return (
    <div style={{ textAlign: 'center', paddingTop: '40px' }}> {/* Добавляем отступ сверху и выравнивание по центру */}
      {goals.length > 0 ? (
        goals.map((el: IGoal) => (
          <GoalCard
            goal={el}
            key={el.id}
            onDelete={() => deleteGoal(Number(el.id))}
            onUpdate={(updatedGoal) => updateGoal(el.id, updatedGoal)}
          />
        ))
      ) : (
        <h1 style={{ marginTop: '20px' }}>Целей пока нет</h1> 
      )}
    </div>
  );
}

export const memorizedGoalList = React.memo(GoalList);