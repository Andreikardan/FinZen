import { createSlice } from "@reduxjs/toolkit";
import { ArrayBudgetsType, IBudget } from "../model/type";
import {
  createBudgetThunk,
  deleteBudgetThunk,
  getAllBudgetsThunk,
  updateBudgetThunk,
  getBudgetByIdThunk
} from "../api";

type BudgetsState = {
  budgets: ArrayBudgetsType | [];
  currentBudget: IBudget | null;
  error: string | null;
  loading: boolean;
};
const initialState: BudgetsState = {
  budgets: [],
  currentBudget: null,
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
      .addCase(getBudgetByIdThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBudgetByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBudget = action.payload.data
      })
      .addCase(getBudgetByIdThunk.rejected, (state, action) => {
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
      })
      .addCase(createBudgetThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload!.error;
      })
      .addCase(updateBudgetThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBudgetThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.budgets = state.budgets.map((budget) =>
          budget.id === action.payload.data.id ? action.payload.data : budget
        );
        state.error = null;
      })
      .addCase(updateBudgetThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload!.error;
      })
      .addCase(deleteBudgetThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBudgetThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.budgets = state.budgets.filter(
          (budget) => budget.id !== action.payload.data.id
        );
      })
      .addCase(deleteBudgetThunk.rejected,(state,action)=>{
        state.loading = false;
        state.error = action.payload!.error
      });
  },
});

export const budgetReducer = budgetSlice.reducer;
