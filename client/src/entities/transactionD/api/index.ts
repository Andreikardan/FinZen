import { IApiResponseReject, IApiResponseSuccess } from "@/shared/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  IRawTransactionDData,
  ITransactionD,
  ArrayTransactionDsType,
} from "../model";
import { axiosInstance } from "@/shared/lib/axiosInstance";
import { AxiosError } from "axios";

enum TRANSACTIONDS_THUNKS_TYPE {
  GET_ALL = "transactiond/getAll",
  GET_BY_ID = "transactiond/getById",
  CREATE = "transactiond/create",
  DELETE = "transactiond/delete",
  UPDATE = "transactiond/update",
}

export const getAllTransactionDsThunk = createAsyncThunk<
  IApiResponseSuccess<ArrayTransactionDsType>,
  void,
  { rejectValue: IApiResponseReject }
>(TRANSACTIONDS_THUNKS_TYPE.GET_ALL, async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get<
      IApiResponseSuccess<ArrayTransactionDsType>
    >("/transactionds");

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

export const getTransactionDByIdThunk = createAsyncThunk<
  IApiResponseSuccess<ITransactionD>,
  number,
  { rejectValue: IApiResponseReject }
>(TRANSACTIONDS_THUNKS_TYPE.GET_BY_ID, async (id, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.delete<
      IApiResponseSuccess<ITransactionD>
    >(`/transactionds/${id}`);

    return data;
  } catch (error) {
    const err = error as AxiosError<IApiResponseReject>;
    return rejectWithValue(err.response!.data);
  }
});

export const createTransactionDThunk = createAsyncThunk<
  IApiResponseSuccess<ITransactionD>,
  IRawTransactionDData,
  { rejectValue: IApiResponseReject }
>(
  TRANSACTIONDS_THUNKS_TYPE.CREATE,
  async (newTransactionD, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post<
        IApiResponseSuccess<ITransactionD>
      >("/transactionds", newTransactionD);
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
export const deleteTransactionDThunk = createAsyncThunk<
  IApiResponseSuccess<ITransactionD>,
  number,
  { rejectValue: IApiResponseReject }
>(TRANSACTIONDS_THUNKS_TYPE.DELETE, async (id, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.delete<
      IApiResponseSuccess<ITransactionD>
    >(`/transactionds/${id}`);
    console.log(data.data, 444);

    return data;
  } catch (error) {
    const err = error as AxiosError<IApiResponseReject>;
    return rejectWithValue(err.response!.data);
  }
});
export const updateTransactionDThunk = createAsyncThunk<
  IApiResponseSuccess<ITransactionD>,
  { id: number; updatedTransactionD: IRawTransactionDData },
  { rejectValue: IApiResponseReject }
>(
  TRANSACTIONDS_THUNKS_TYPE.UPDATE,
  async ({ id, updatedTransactionD }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put<
        IApiResponseSuccess<ITransactionD>
      >(`/transactionds/${id}`, updatedTransactionD);
      return data;
    } catch (error) {
      const err = error as AxiosError<IApiResponseReject>;
      return rejectWithValue(err.response!.data);
    }
  }
);
