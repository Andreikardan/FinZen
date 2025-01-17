import { createSlice } from "@reduxjs/toolkit";
import { ArrayBudgetsType, IOneBudgetTransactions } from "../model/type";

import {
  createBudgetThunk,
  deleteBudgetThunk,
  getAllBudgetsThunk,
  updateBudgetThunk,
  getBudgetByIdThunk,
  getAllTransactionsThunk,
  addPhotoToTransactionRThunk,
} from "../api";
import { AllTransactionArray } from "@/entities/transactionR/model";

type BudgetsState = {
  budgets: ArrayBudgetsType | [];
  currentBudget: IOneBudgetTransactions | null;
  allTransactionsArray: AllTransactionArray | null;
  error: string | null;
  loading: boolean;
};
const initialState: BudgetsState = {
  budgets: [],
  currentBudget: null,
  allTransactionsArray: null,
  error: null,
  loading: false,
};
const budgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {
    deleteBudget: (state, action) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore

      state.allTransactionsArray = state.allTransactionsArray?.filter(
        (el) => el.budget_id !== action.payload
      );
    },
    deleteGoal: (state, action) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore

      state.allTransactionsArray = state.allTransactionsArray?.filter((el) => {
        if (el.goal_id) {
          return el.goal_id!==action.payload

        }else{
          return true
        }
      });
    },
  },
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
        state.currentBudget = action.payload.data;
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
      .addCase(deleteBudgetThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload!.error;
      })
      .addCase(getAllTransactionsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllTransactionsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.allTransactionsArray = action.payload.data;
        state.error = null;
      })
      .addCase(getAllTransactionsThunk.rejected, (state, action) => {
        state.loading = false;
        state.allTransactionsArray = [];
        state.error = action.payload!.error;
      })
      .addCase(addPhotoToTransactionRThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(addPhotoToTransactionRThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        state.allTransactionsArray = state.allTransactionsArray?.map(
          (transaction) => {
            if (transaction.id === action.payload.id) {
              if (!transaction.TransactionRPhotos) {
                transaction.TransactionRPhotos = [];
                transaction.TransactionRPhotos.push(action.payload.data.data);
              } else {
                transaction.TransactionRPhotos.push(action.payload.data.data);
              }

              return transaction;
            } else {
              return transaction;
            }
          }
        );
      })
      .addCase(addPhotoToTransactionRThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload!.error;
      });
  },
});

export const budgetReducer = budgetSlice.reducer;
export const deleteBudget = budgetSlice.actions.deleteBudget;
export const deleteGoal = budgetSlice.actions.deleteGoal
