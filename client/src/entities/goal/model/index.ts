export interface IRawGoalData {
    title?: string;
    goal: number |null ;
    accumulator: number | null;
}

export interface IGoal extends IRawGoalData {
    id: number;
    createdAt: Date;
    updatedAt: Date;
}

export type ArrayGoalsType = Array<IGoal>