import { IApiResponseReject, IApiResponseSuccess } from "@/shared/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  IRawTransactionRData,
  ITransactionR,
  ArrayTransactionRsType,
} from "../model";
import { axiosInstance } from "@/shared/lib/axiosInstance";
import { AxiosError } from "axios";

enum TRANSACTIONRS_THUNKS_TYPE {
  GET_ALL = "transactionr/getAll",
  GET_BY_ID = "transactionr/getById",
  CREATE = "transactionr/create",
  DELETE = "transactionr/delete",
  UPDATE = "transactionr/update",
}

export const getAllTransactionRsThunk = createAsyncThunk<
  IApiResponseSuccess<ArrayTransactionRsType>,
  void,
  { rejectValue: IApiResponseReject }
>(TRANSACTIONRS_THUNKS_TYPE.GET_ALL, async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get<
      IApiResponseSuccess<ArrayTransactionRsType>
    >("/transactionrs");

    if (data.statusCode !== 200) {
      return rejectWithValue({
        statusCode: data.statusCode,
        data: null,
        message: data.message,
        error: data.error!,
      });
    }
    return data;
  } catch (error) {
    const err = error as AxiosError<IApiResponseReject>;
    return rejectWithValue(err.response!.data);
  }
});

export const getTransactionRByIdThunk = createAsyncThunk<
  IApiResponseSuccess<ITransactionR>,
  number,
  { rejectValue: IApiResponseReject }
>(TRANSACTIONRS_THUNKS_TYPE.GET_BY_ID, async (id, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.delete<
      IApiResponseSuccess<ITransactionR>
    >(`/transactionrs/${id}`);

    return data;
  } catch (error) {
    const err = error as AxiosError<IApiResponseReject>;
    return rejectWithValue(err.response!.data);
  }
});

export const createTransactionRThunk = createAsyncThunk<
  IApiResponseSuccess<ITransactionR>,
  IRawTransactionRData,
  { rejectValue: IApiResponseReject }
>(
  TRANSACTIONRS_THUNKS_TYPE.CREATE,
  async (newTransactionR, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post<
        IApiResponseSuccess<ITransactionR>
      >("/transactionrs", newTransactionR);
      if (data.statusCode !== 201) {
        return rejectWithValue({
          data: null,
          statusCode: data.statusCode,
          error: data.error!,
          message: data.message,
        });
      }
      return data;
    } catch (error) {
      const err = error as AxiosError<IApiResponseReject>;
      return rejectWithValue(err.response!.data);
    }
  }
);
export const deleteTransactionRThunk = createAsyncThunk<
  IApiResponseSuccess<ITransactionR>,
  number,
  { rejectValue: IApiResponseReject }
>(TRANSACTIONRS_THUNKS_TYPE.DELETE, async (id, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.delete<
      IApiResponseSuccess<ITransactionR>
    >(`/transactionrs/${id}`);
    console.log(data.data, 444);

    return data;
  } catch (error) {
    const err = error as AxiosError<IApiResponseReject>;
    return rejectWithValue(err.response!.data);
  }
});
export const updateTransactionRThunk = createAsyncThunk<
  IApiResponseSuccess<ITransactionR>,
  { id: number; updatedTransactionR: IRawTransactionRData },
  { rejectValue: IApiResponseReject }
>(
  TRANSACTIONRS_THUNKS_TYPE.UPDATE,
  async ({ id, updatedTransactionR }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put<
        IApiResponseSuccess<ITransactionR>
      >(`/transactionrs/${id}`, updatedTransactionR);
      return data;
    } catch (error) {
      const err = error as AxiosError<IApiResponseReject>;
      return rejectWithValue(err.response!.data);
    }
  }
);
