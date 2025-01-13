export interface IRawGoalData {
    title: string;
    goal: number ;
    accumulator: number;
}

export interface IGoal extends IRawGoalData {
    id: number;
    createdAt: Date;
    updatedAt: Date;
}

export type ArrayGoalsType = Array<IGoal>