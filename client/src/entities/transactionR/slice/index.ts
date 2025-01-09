import { createSlice } from "@reduxjs/toolkit";
import { ArrayTransactionRsType, ITransactionR } from "../model";
import {
  createTransactionRThunk,
  deleteTransactionRThunk,
  getAllTransactionRsThunk,
  updateTransactionRThunk,
  getTransactionRByIdThunk,
} from "../api";

type TransactionRsState = {
  transactionRs: ArrayTransactionRsType | [];
  currentTransactionR: ITransactionR | null;
  error: string | null;
  loading: boolean;
};
const initialState: TransactionRsState = {
  transactionRs: [],
  currentTransactionR: null,
  error: null,
  loading: false,
};
const transactionRSlice = createSlice({
  name: "transactionR",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTransactionRsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllTransactionRsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.transactionRs = action.payload.data;
        state.error = null;
      })
      .addCase(getAllTransactionRsThunk.rejected, (state, action) => {
        state.loading = false;
        state.transactionRs = [];
        state.error = action.payload!.error;
      })
      .addCase(getTransactionRByIdThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTransactionRByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.currentTransactionR = action.payload.data;
      })
      .addCase(getTransactionRByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.transactionRs = [];
        state.error = action.payload!.error;
      })
      .addCase(createTransactionRThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTransactionRThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.transactionRs = [...state.transactionRs, action.payload.data];
        state.error = null;
      })
      .addCase(createTransactionRThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload!.error;
      })
      .addCase(updateTransactionRThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTransactionRThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.transactionRs = state.transactionRs.map((transactionR) =>
          transactionR.id === action.payload.data.id
            ? action.payload.data
            : transactionR
        );
        state.error = null;
      })
      .addCase(updateTransactionRThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload!.error;
      })
      .addCase(deleteTransactionRThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTransactionRThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.transactionRs = state.transactionRs.filter(
          (transactionR) => transactionR.id !== action.payload.data.id
        );
      })
      .addCase(deleteTransactionRThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload!.error;
      });
  },
});

export const transactionRReducer = transactionRSlice.reducer;
