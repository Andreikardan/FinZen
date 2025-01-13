import React from 'react'
import { useGoalList } from '../useGoalList'
import { IGoal } from '@/entities/goal'
import { GoalCard } from '@/entities/goal/ui/GoalCard'





export  function GoalList(): JSX.Element {
 const {goals, deleteGoal, updateGoal} =  useGoalList()

 

  return (
   
    <div>
           {goals.length > 0 ? (
        goals.map((el: IGoal) => (
          <GoalCard
    
            goal={el}
            key={el.id}
            onDelete={() => deleteGoal(el.id)}
            onUpdate={(updatedGoal) => updateGoal(el.id, updatedGoal)}
       
          />
        ))
      ) : (
        <h1>Задач пока не обнаружено</h1>
      )}
      
    </div>
  )
}
export const memorizedGoalList = React.memo(GoalList );