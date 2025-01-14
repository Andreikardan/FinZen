import {   ArrayGoalTransactionsType } from "../model"
import {    createGoalTransactionThunk,    getAllGoalTransactionsThunk } from "../api";
import { createSlice } from "@reduxjs/toolkit";

type GoalState = {
    goalTransactions: ArrayGoalTransactionsType | [];
    error: string | null;
    loading: boolean
}

const initialState: GoalState = {
    goalTransactions: [],
    error: null,
    loading: false,
}


const goalTransactionSlice = createSlice ({
    name: "goalTransaction",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder 
      .addCase(getAllGoalTransactionsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllGoalTransactionsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.goalTransactions = action.payload.data;
        state.error = null;
        
      })
      .addCase(getAllGoalTransactionsThunk.rejected, (state, action) => {
        state.loading = false;
        state.goalTransactions = [];
        state.error = action.payload!.error;
        
      })

      .addCase(createGoalTransactionThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(createGoalTransactionThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.goalTransactions = [...state.goalTransactions, action.payload.data];
        state.error = null;
        
      })
      .addCase(createGoalTransactionThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload!.error;
       
      })

    }
})

export const goalTransactionReducer = goalTransactionSlice.reducer;