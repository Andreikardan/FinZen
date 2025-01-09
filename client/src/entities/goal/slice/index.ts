
import { ArrayGoalsType } from "../model"
import { createGoalThunk, deleteGoalThunk, getAllGoalsThunk, updateGoalThunk } from "../api";
import { message } from "antd";
import { createSlice } from "@reduxjs/toolkit";

type GoalState = {
    goals: ArrayGoalsType | [];
    error: string | null;
    loading: boolean
}

const initialState: GoalState = {
    goals: [],
    error: null,
    loading: false,
}


const goalSlice = createSlice ({
    name: "goal",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder 
      .addCase(getAllGoalsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllGoalsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.goals = action.payload.data;
        state.error = null;
        message.success(action.payload.message)
      })
      .addCase(getAllGoalsThunk.rejected, (state, action) => {
        state.loading = false;
        state.goals = [];
        state.error = action.payload!.error;
        message.error(action.payload!.error)
      })

      .addCase(createGoalThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(createGoalThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.goals = [...state.goals, action.payload.data];
        state.error = null;
        message.success(action.payload.message)
      })
      .addCase(createGoalThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload!.error;
        message.error(action.payload!.error)
      })

      .addCase(deleteGoalThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteGoalThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.goals =  state.goals.filter((goal) => goal.id !== action.payload.data.id);
        state.error = null;
        message.success(action.payload.message)
      })
      .addCase(deleteGoalThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload!.error;
        message.error(action.payload!.error)
      })

      .addCase(updateGoalThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateGoalThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.goals =  state.goals.map((goal) => goal.id === action.payload.data.id ? action.payload.data : goal);
        state.error = null;
        message.success(action.payload.message)
      })
      // .addCase(deleteGoalThunk.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.payload!.error;
      //   message.error(action.payload!.error)
      // })
    }
})

export const goalReducer = goalSlice.reducer;