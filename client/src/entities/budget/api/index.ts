import { AxiosError } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IApiResponseReject, IApiResponseSuccess } from "@/shared/types";
import {
  ArrayBudgetsType,
  IBudget,
  IOneBudgetTransactions,
  IRawBudgetData,
} from "../model/type";
import { axiosInstance } from "@/shared/lib/axiosInstance";
import { AllTransactionArray } from "@/entities/transactionR/model";
import { IPhoto } from "@/entities/photo";

enum BUDGETS_THUNKS_TYPE {
  GET_ALL = "budget/getAll",
  GET_BY_ID = "budget/getById",
  CREATE = "budget/create",
  DELETE = "budget/delete",
  UPDATE = "budget/update",
  GET_ALL_TRANSACTIONS = "budget/allTransactions",
  ADD_PHOTO = "budget/addPhoto",
}

export const getAllBudgetsThunk = createAsyncThunk<
  IApiResponseSuccess<ArrayBudgetsType>,
  void,
  { rejectValue: IApiResponseReject }
>(BUDGETS_THUNKS_TYPE.GET_ALL, async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get<
      IApiResponseSuccess<ArrayBudgetsType>
    >("/budgets");

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

export const getBudgetByIdThunk = createAsyncThunk<
  IApiResponseSuccess<IOneBudgetTransactions>,
  number,
  { rejectValue: IApiResponseReject }
>(BUDGETS_THUNKS_TYPE.GET_BY_ID, async (id, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get<
      IApiResponseSuccess<IOneBudgetTransactions>
    >(`/budgets/${id}`);

    return data;
  } catch (error) {
    const err = error as AxiosError<IApiResponseReject>;
    return rejectWithValue(err.response!.data);
  }
});

export const createBudgetThunk = createAsyncThunk<
  IApiResponseSuccess<IBudget>,
  IRawBudgetData,
  { rejectValue: IApiResponseReject }
>(BUDGETS_THUNKS_TYPE.CREATE, async (newBudget, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.post<IApiResponseSuccess<IBudget>>(
      "/budgets",
      newBudget
    );
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
});
export const deleteBudgetThunk = createAsyncThunk<
  IApiResponseSuccess<IBudget>,
  number,
  { rejectValue: IApiResponseReject }
>(BUDGETS_THUNKS_TYPE.DELETE, async (id, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.delete<IApiResponseSuccess<IBudget>>(
      `/budgets/${id}`
    );

    return data;
  } catch (error) {
    const err = error as AxiosError<IApiResponseReject>;
    return rejectWithValue(err.response!.data);
  }
});

export const updateBudgetThunk = createAsyncThunk<
  IApiResponseSuccess<IBudget>,
  { id: number; updatedBudget: IRawBudgetData },
  { rejectValue: IApiResponseReject }
>(
  BUDGETS_THUNKS_TYPE.UPDATE,
  async ({ id, updatedBudget }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put<IApiResponseSuccess<IBudget>>(
        `/budgets/${id}`,
        updatedBudget
      );
      return data;
    } catch (error) {
      const err = error as AxiosError<IApiResponseReject>;
      return rejectWithValue(err.response!.data);
    }
  }
);

export const getAllTransactionsThunk = createAsyncThunk<
  IApiResponseSuccess<AllTransactionArray>,
  void,
  { rejectValue: IApiResponseReject }
>(BUDGETS_THUNKS_TYPE.GET_ALL_TRANSACTIONS, async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get<
      IApiResponseSuccess<AllTransactionArray>
    >("/budgets/allTransactions");
    return data;
  } catch (error) {
    const err = error as AxiosError<IApiResponseReject>;
    return rejectWithValue(err.response!.data);
  }
});

export const addPhotoToTransactionRThunk = createAsyncThunk<
  { id: number, data: IApiResponseSuccess<IPhoto>},
  { id: number; formData: FormData },
  { rejectValue: IApiResponseReject }
>(
  BUDGETS_THUNKS_TYPE.ADD_PHOTO,
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post<IApiResponseSuccess<IPhoto>>(
        `/imagesForTransaction/upload/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.statusCode !== 201) {
        return rejectWithValue({
          data: null,
          statusCode: data.statusCode,
          error: data.error!,
          message: data.message,
        });
      }
      return { id, data };
    } catch (error) {
      const err = error as AxiosError<IApiResponseReject>;
      return rejectWithValue(err.response!.data);
    }
  }
);
