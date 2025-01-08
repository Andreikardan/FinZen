import { createSlice } from "@reduxjs/toolkit";
import { ArrayCategoryDsType } from "../model";
import {
  createCategoryDThunk,
  deleteCategoryDThunk,
  getAllCategoryDsThunk,
  updateCategoryDThunk,
} from "../api";

type CategoryDsState = {
  categoryDs: ArrayCategoryDsType | [];
  error: string | null;
  loading: boolean;
};
const initialState: CategoryDsState = {
  categoryDs: [],
  error: null,
  loading: false,
};
const categoryDSlice = createSlice({
  name: "categoryD",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategoryDsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCategoryDsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryDs = action.payload.data;
        state.error = null;
      })
      .addCase(getAllCategoryDsThunk.rejected, (state, action) => {
        state.loading = false;
        state.categoryDs = [];
        state.error = action.payload!.error;
      })
      .addCase(createCategoryDThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCategoryDThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryDs = [...state.categoryDs, action.payload.data];
        state.error = null;
      })
      .addCase(createCategoryDThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload!.error;
      })
      .addCase(updateCategoryDThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCategoryDThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryDs = state.categoryDs.map((categoryd) =>
          categoryd.id === action.payload.data.id
            ? action.payload.data
            : categoryd
        );
        state.error = null;
      })
      .addCase(updateCategoryDThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload!.error;
      })
      .addCase(deleteCategoryDThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCategoryDThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryDs = state.categoryDs.filter(
          (categoryD) => categoryD.id !== action.payload.data.id
        );
      })
      .addCase(deleteCategoryDThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload!.error;
      });
  },
});

export const categoryDReducer = categoryDSlice.reducer;
