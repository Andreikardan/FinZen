import { createSlice } from "@reduxjs/toolkit";
import { ArrayTransactionDsType, ITransactionD } from "../model";
import {
  createTransactionDThunk,
  deleteTransactionDThunk,
  getAllTransactionDsThunk,
  updateTransactionDThunk,
  getTransactionDByIdThunk,
} from "../api";

type TransactionDsState = {
  transactionDs: ArrayTransactionDsType | [];
  currentTransactionD: ITransactionD | null;
  error: string | null;
  loading: boolean;
};
const initialState: TransactionDsState = {
  transactionDs: [],
  currentTransactionD: null,
  error: null,
  loading: false,
};
const transactionDSlice = createSlice({
  name: "transactionD",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTransactionDsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllTransactionDsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.transactionDs = action.payload.data;
        state.error = null;
      })
      .addCase(getAllTransactionDsThunk.rejected, (state, action) => {
        state.loading = false;
        state.transactionDs = [];
        state.error = action.payload!.error;
      })
      .addCase(getTransactionDByIdThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTransactionDByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.currentTransactionD = action.payload.data;
      })
      .addCase(getTransactionDByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.transactionDs = [];
        state.error = action.payload!.error;
      })
      .addCase(createTransactionDThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTransactionDThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.transactionDs = [...state.transactionDs, action.payload.data];
        state.error = null;
      })
      .addCase(createTransactionDThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload!.error;
      })
      .addCase(updateTransactionDThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTransactionDThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.transactionDs = state.transactionDs.map((transactionD) =>
          transactionD.id === action.payload.data.id
            ? action.payload.data
            : transactionD
        );
        state.error = null;
      })
      .addCase(updateTransactionDThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload!.error;
      })
      .addCase(deleteTransactionDThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTransactionDThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.transactionDs = state.transactionDs.filter(
          (transactionD) => transactionD.id !== action.payload.data.id
        );
      })
      .addCase(deleteTransactionDThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload!.error;
      });
  },
});

export const transactionDReducer = transactionDSlice.reducer;
