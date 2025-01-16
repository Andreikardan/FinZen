import type { AxiosError } from 'axios';
import { axiosInstance, setAccessToken } from '../../../shared/lib/axiosInstance';
import type { IApiResponseReject, IApiResponseSuccess } from '../../../shared/types';
import { UserWithoutTokenType, type ISignInData, type ISignUpData, type UserWithTokenType } from '../model';
import { createAsyncThunk } from '@reduxjs/toolkit';

enum AUTH_API_ROUTES {
  REFRESH_TOKEN = '/auth/refreshToken',
  SIGN_IN = '/auth/signIn',
  SIGN_UP = '/auth/signUp',
  SIGN_OUT = '/auth/signOut',
  INFO = '/auth/info',
  UPDATE = '/auth/update'
}

enum USER_THUNKS_TYPES {
  REFRESH_TOKEN = 'user/refreshTokens',
  SIGN_IN = 'user/SignIn',
  SIGN_OUT = 'user/signOut',
  SIGN_UP = 'user/signUp',
  INFO = 'user/info',
  UPDATE = 'user/update',
}

export const refreshTokensThunk = createAsyncThunk<
  IApiResponseSuccess<UserWithTokenType>,
  undefined,
  { rejectValue: IApiResponseReject }
>(USER_THUNKS_TYPES.REFRESH_TOKEN, async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get<IApiResponseSuccess<UserWithTokenType>>(
      AUTH_API_ROUTES.REFRESH_TOKEN,
    );
 
    setAccessToken(data.data.accessToken);
    return data;
  } catch (error) {
    const err = error as AxiosError<IApiResponseReject>;
    return rejectWithValue(err.response!.data);
  }
});

export const signUpThunk = createAsyncThunk<
  IApiResponseSuccess<UserWithTokenType>,
  ISignUpData,
  { rejectValue: IApiResponseReject }
>(USER_THUNKS_TYPES.SIGN_UP, async (userData, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.post<IApiResponseSuccess<UserWithTokenType>>(
      AUTH_API_ROUTES.SIGN_UP,
      userData,
    );
    
    setAccessToken(data.data.accessToken);
    return data;
  } catch (error) {
    const err = error as AxiosError<IApiResponseReject>;
    return rejectWithValue(err.response!.data);
  }
});

export const signInThunk = createAsyncThunk<IApiResponseSuccess<UserWithTokenType>,ISignInData,{ rejectValue: IApiResponseReject }
>(USER_THUNKS_TYPES.SIGN_IN, async (signInData, { rejectWithValue }) => {
  
  try {
    const { data } = await axiosInstance.post<IApiResponseSuccess<UserWithTokenType>>(AUTH_API_ROUTES.SIGN_IN, signInData,
    );
    setAccessToken(data.data.accessToken);
    
    return data;
  } catch (error) {
    const err = error as AxiosError<IApiResponseReject>;
    return rejectWithValue(err.response!.data);
  }
});

export const signOutThunk = createAsyncThunk<IApiResponseSuccess<null>, void, { rejectValue: IApiResponseReject }
>(USER_THUNKS_TYPES.SIGN_OUT, async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get<IApiResponseSuccess<null>>(AUTH_API_ROUTES.SIGN_OUT,);
  
    setAccessToken('');
    return data;
  } catch (error) {
    const err = error as AxiosError<IApiResponseReject>;
    return rejectWithValue(err.response!.data);
  }
});

export const updateThunk = createAsyncThunk<IApiResponseSuccess<UserWithoutTokenType>, {[key:string]:string}, { rejectValue: IApiResponseReject }
>(USER_THUNKS_TYPES.UPDATE, async (signUpData, { rejectWithValue }) => {
    try {
      const {data} = await axiosInstance.put<IApiResponseSuccess<UserWithoutTokenType>>(AUTH_API_ROUTES.UPDATE, signUpData);
      return data
    } catch (error) {
      const err = error as AxiosError<IApiResponseReject>;
    return rejectWithValue(err.response!.data);
    }
  })

