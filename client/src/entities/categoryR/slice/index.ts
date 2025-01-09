import { createSlice } from "@reduxjs/toolkit";
import { ArrayCategoryRsType, ICategoryR } from "../model";
import {
  createCategoryRThunk,
  deleteCategoryRThunk,
  getAllCategoryRsThunk,
  updateCategoryRThunk,
  getCategoryRByIdThunk,
} from "../api";

type CategoryRsState = {
  categoryRs: ArrayCategoryRsType | [];
  currentCategoryR: ICategoryR | null;
  error: string | null;
  loading: boolean;
};
const initialState: CategoryRsState = {
  categoryRs: [],
  currentCategoryR: null,
  error: null,
  loading: false,
};
const categoryRSlice = createSlice({
  name: "categoryR",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategoryRsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCategoryRsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryRs = action.payload.data;
        state.error = null;
      })
      .addCase(getAllCategoryRsThunk.rejected, (state, action) => {
        state.loading = false;
        state.categoryRs = [];
        state.error = action.payload!.error;
      })
      .addCase(getCategoryRByIdThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCategoryRByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCategoryR = action.payload.data;
      })
      .addCase(getCategoryRByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.categoryRs = [];
        state.error = action.payload!.error;
      })
      .addCase(createCategoryRThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCategoryRThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryRs = [...state.categoryRs, action.payload.data];
        state.error = null;
      })
      .addCase(createCategoryRThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload!.error;
      })
      .addCase(updateCategoryRThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCategoryRThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryRs = state.categoryRs.map((categoryr) =>
          categoryr.id === action.payload.data.id
            ? action.payload.data
            : categoryr
        );
        state.error = null;
      })
      .addCase(updateCategoryRThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload!.error;
      })
      .addCase(deleteCategoryRThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCategoryRThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryRs = state.categoryRs.filter(
          (categoryR) => categoryR.id !== action.payload.data.id
        );
      })
      .addCase(deleteCategoryRThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload!.error;
      });
  },
});

export const categoryRReducer = categoryRSlice.reducer;
