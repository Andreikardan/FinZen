import { createSlice } from "@reduxjs/toolkit";
import { CategoryList, ICategory } from "@/entities/category";
import {
  createCategoryRThunk,
  deleteCategoryRThunk,
  getAllCategoryRThunk,
  updateCategoryRThunk,
} from "../api";

type CategoryRsState = {
  categoryR: CategoryList | [];
  currentCategoryR: ICategory | null;
  error: string | null;
  loading: boolean;
};
const initialState: CategoryRsState = {
  categoryR: [],
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
      .addCase(getAllCategoryRThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCategoryRThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryR = action.payload.data;
        state.error = null;
      })
      .addCase(getAllCategoryRThunk.rejected, (state, action) => {
        state.loading = false;
        state.categoryR = [];
        state.error = action.payload!.error;
      })

      .addCase(createCategoryRThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCategoryRThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryR = [...state.categoryR, action.payload.data];
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
        state.categoryR = state.categoryR.map((categoryr) =>
          categoryr.id === action.payload.data.id ? action.payload.data : categoryr
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
        state.categoryR = state.categoryR.filter(
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
