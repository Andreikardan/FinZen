import { createSlice } from "@reduxjs/toolkit";
import { ArrayInfoSliderType } from "../model";
import { getInfoSliderDataThunk } from "../api";

type SliderDataState = {
  slider: ArrayInfoSliderType | [];
  error: string | null;
  loading: boolean;
};
const initialState: SliderDataState = {
  slider: [],
  error: null,
  loading: false,
};

const sliderSlice = createSlice({
  name: "slider",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getInfoSliderDataThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getInfoSliderDataThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.slider = action.payload.data;
        state.error = null;
      })
      .addCase(getInfoSliderDataThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload!.error;
        state.slider = [];
      });
  },
});

export const sliderReducer = sliderSlice.reducer;
