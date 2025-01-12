export interface IRawGoalTransactionData {
    sumGoal: number;
}

export interface IGoalTransaction extends IRawGoalTransactionData {
    id: number;
    budget_id: number;
    goal_id: number;
    createdAt: Date;
    updatedAt: Date;
}

export type ArrayGoalTransactionsType = Array<IGoalTransaction>