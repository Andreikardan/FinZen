import { IApiResponseReject, IApiResponseSuccess } from "@/shared/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ArrayGoalTransactionsType, IGoalTransaction, IRawGoalTransactionData } from "../model";
import { axiosInstance } from "@/shared/lib/axiosInstance";
import { AxiosError } from "axios";

enum GOAL_THUNKS_TYPES {
    GET_ALL = "goalTransaction/getAll",
    CREATE = "goalTransaction/create",
}


export const getAllGoalTransactionsThunk = createAsyncThunk<
  IApiResponseSuccess<ArrayGoalTransactionsType>,
  void,
  { rejectValue: IApiResponseReject }
>(GOAL_THUNKS_TYPES.GET_ALL, async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get<
      IApiResponseSuccess<ArrayGoalTransactionsType>
    >('/goal-transactions');

    return data;
  } catch (error) {
    const err = error as AxiosError<IApiResponseReject>;
    return rejectWithValue(err.response!.data);
  }
});


export const createGoalTransactionThunk = createAsyncThunk<
  IApiResponseSuccess<IGoalTransaction>,
  {goal_id: number, sumGoal:number, budget_id:number},
  { rejectValue: IApiResponseReject }
>(GOAL_THUNKS_TYPES.CREATE, async ( newGoal, { rejectWithValue }) => {
  try {
    console.log(newGoal,777);
    
    const { data } = await axiosInstance.post<
      IApiResponseSuccess<IGoalTransaction>
    >(`/goal-transactions`,
      newGoal
    );

    return data;
  } catch (error) {
    const err = error as AxiosError<IApiResponseReject>;
    return rejectWithValue(err.response!.data);
  }
});

