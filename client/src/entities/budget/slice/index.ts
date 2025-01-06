import { createSlice } from "@reduxjs/toolkit";
import { ArrayBudgetsType } from "../model/type";
import { createBudgetThunk, getAllBudgetsThunk } from "../api";

type BudgetsState = {
  budgets: ArrayBudgetsType | [];
  error: string | null;
  loading: boolean;
};
const initialState: BudgetsState = {
  budgets: [],
  error: null,
  loading: false,
};
  const budgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBudgetsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllBudgetsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.budgets = action.payload.data;
        state.error = null;
      })
      .addCase(getAllBudgetsThunk.rejected, (state, action) => {
        state.loading = false;
        state.budgets = [];
        state.error = action.payload!.error;
      })
      .addCase(createBudgetThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBudgetThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.budgets = [...state.budgets, action.payload.data];
        state.error = null;
      }).addCase(createBudgetThunk.rejected, (state,action)=>{
        state.loading = false;
        state.error = action.payload!.error;
      });
  },
});

export const budgetReducer =  budgetSlice.reducer