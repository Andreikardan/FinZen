import type { UserType } from '../model';
import { createSlice } from '@reduxjs/toolkit';
import { refreshTokensThunk, signInThunk, signOutThunk, signUpThunk, updateThunk } from '../api';
import { Toast } from 'antd-mobile';

type UserState = {
  user: UserType | null;
  error: string | null;
  loading: boolean;
  isInitialized: boolean;
};

const initialState: UserState = {
  user: null,
  error: null,
  loading: false,
  isInitialized: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(refreshTokensThunk.pending, (state) => {
        state.loading = true;
        state.isInitialized = false;
      })
      .addCase(refreshTokensThunk.fulfilled, (state, action) => {
        state.user = action.payload.data.user;
        state.loading = false;
        state.isInitialized = true;
      })
      .addCase(refreshTokensThunk.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload!.error;
        state.isInitialized = true;
      })

      .addCase(signUpThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUpThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data.user;
        state.error = null;
        Toast.show({content: 'Привет!' ,position: "bottom",});
      })
      .addCase(signUpThunk.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload!.error;
        Toast.show({content: 'Что-то не так' ,position: "bottom",});
      })
      .addCase(signInThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(signInThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data.user;
        state.error = null;
        Toast.show({content: 'Привет!' ,position: "bottom",});
      })
      .addCase(signInThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload!.error;
        state.user = null;
        Toast.show({content: 'Что-то не так' ,position: "bottom",});
      })

      .addCase(signOutThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(signOutThunk.fulfilled, (state, action) => {
        state.user = null;
        state.loading = false;
        state.error = null;
        Toast.show({content: action.payload.message ,position: "bottom",});
      })
      .addCase(signOutThunk.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload!.error;
        Toast.show({content: 'Что-то не так' ,position: "bottom",});
      })

      .addCase(updateThunk.pending, (state)=>{
        state.loading = true;
      })
      .addCase(updateThunk.fulfilled, (state, action)=>{
        state.loading = false;
        state.error=null;
        Toast.show({content: action.payload.message ,position: "bottom",});
      })
      .addCase(updateThunk.rejected, (state, action)=>{
        state.loading = false;
        state.error = action.payload!.error
        Toast.show({content: action.payload?.message ,position: "bottom",});
      })
  },
});

export const userReducer = userSlice.reducer;
