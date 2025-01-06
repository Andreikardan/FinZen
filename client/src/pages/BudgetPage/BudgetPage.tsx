import { BudgetCard } from '@/entities/budget/ui/BudgetCard';
import { BudgetForm } from '@/widgets/BudgetForm';
import { BudgetList } from '@/widgets/BudgetList/ui/BudgetList';
import { GameTable } from '@/widgets/GameTable/ui/GameTable';
import React from 'react';

export function BudgetPage() {
  return (
    <div>
      <BudgetList/>
      <BudgetForm/>
    </div>
  );
}

