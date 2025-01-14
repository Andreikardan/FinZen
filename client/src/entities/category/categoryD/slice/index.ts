import { createSlice } from "@reduxjs/toolkit";
import { CategoryList, ICategory } from "@/entities/category";
import {
  createCategoryDThunk,
  deleteCategoryDThunk,
  getAllCategoryDThunk,
  updateCategoryDThunk,
} from "../api";

type CategoryDsState = {
  categoryD: CategoryList | [];
  currentCategoryD: ICategory | null;
  error: string | null;
  loading: boolean;
};
const initialState: CategoryDsState = {
  categoryD: [],
  currentCategoryD: null,
  error: null,
  loading: false,
};
const categoryDSlice = createSlice({
  name: "categoryD",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategoryDThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCategoryDThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryD = action.payload.data;
        state.error = null;
      })
      .addCase(getAllCategoryDThunk.rejected, (state, action) => {
        state.loading = false;
        state.categoryD = [];
        state.error = action.payload!.error;
      })

      .addCase(createCategoryDThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCategoryDThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryD = [...state.categoryD, action.payload.data];
        state.error = null;
      })
      .addCase(createCategoryDThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload!.error;
      })

      .addCase(updateCategoryDThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCategoryDThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryD = state.categoryD.map((categoryd) =>
          categoryd.id === action.payload.data.id ? action.payload.data : categoryd
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
        state.categoryD = state.categoryD.filter(
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
