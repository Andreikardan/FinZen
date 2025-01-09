import { IApiResponseSuccess, IApiResponseReject } from "@/shared/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ArrayGoalsType,  IGoal,  IRawGoalData } from "../model";
import { axiosInstance } from "@/shared/lib/axiosInstance";
import { AxiosError } from "axios";

enum GOAL_THUNKS_TYPES {
    GET_ALL = "goal/getAll",
    CREATE = "goal/create",
    DELETE = "goal/delete",
    UPDATE = "goal/update"
}


export const getAllGoalsThunk = createAsyncThunk<
  IApiResponseSuccess<ArrayGoalsType>,
  void,
  { rejectValue: IApiResponseReject }
>(GOAL_THUNKS_TYPES.GET_ALL, async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get<
      IApiResponseSuccess<ArrayGoalsType>
    >('/goals');

    return data;
  } catch (error) {
    const err = error as AxiosError<IApiResponseReject>;
    return rejectWithValue(err.response!.data);
  }
});


export const createGoalThunk = createAsyncThunk<
  IApiResponseSuccess<IGoal>,
  IRawGoalData,
  { rejectValue: IApiResponseReject }
>(GOAL_THUNKS_TYPES.CREATE, async (newGoal, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.post<
      IApiResponseSuccess<IGoal>
    >('/goals',
      newGoal
    );

    return data;
  } catch (error) {
    const err = error as AxiosError<IApiResponseReject>;
    return rejectWithValue(err.response!.data);
  }
});

export const deleteGoalThunk = createAsyncThunk<
  IApiResponseSuccess<IGoal>,
  number,
  { rejectValue: IApiResponseReject }
>(GOAL_THUNKS_TYPES.DELETE, async (id, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.delete<
      IApiResponseSuccess<IGoal>
    >(`/goals/${id}`);
    return data;
  } catch (error) {
    const err = error as AxiosError<IApiResponseReject>;
    return rejectWithValue(err.response!.data);
  }
});


export const updateGoalThunk = createAsyncThunk<
  IApiResponseSuccess<IGoal>,
  {id:number, updatedGoal: IRawGoalData},
  { rejectValue: IApiResponseReject }
>(GOAL_THUNKS_TYPES.UPDATE, async ({id, updatedGoal}, { rejectWithValue }) => {
  try {
    
    const { data } = await axiosInstance.put<
      IApiResponseSuccess<IGoal>
    >(`/goals/${id}`,
        updatedGoal
    );
    return data;
  } catch (error) {
    const err = error as AxiosError<IApiResponseReject>;
    return rejectWithValue(err.response!.data);
  }
});
