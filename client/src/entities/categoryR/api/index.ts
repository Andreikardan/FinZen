import { IApiResponseReject, IApiResponseSuccess } from "@/shared/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IRawCategoryRData, ICategoryR, ArrayCategoryRsType } from "../model";
import { axiosInstance } from "@/shared/lib/axiosInstance";
import { AxiosError } from "axios";

enum CATEGORYRS_THUNKS_TYPE {
  GET_ALL = "categoryr/getAll",
  GET_BY_ID = "categoryr/getById",
  CREATE = "categoryr/create",
  DELETE = "categoryr/delete",
  UPDATE = "categoryr/update",
}

export const getAllCategoryRsThunk = createAsyncThunk<
  IApiResponseSuccess<ArrayCategoryRsType>,
  void,
  { rejectValue: IApiResponseReject }
>(CATEGORYRS_THUNKS_TYPE.GET_ALL, async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get<
      IApiResponseSuccess<ArrayCategoryRsType>
    >("/categoryrs");

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


export const getCategoryRByIdThunk = createAsyncThunk<
  IApiResponseSuccess<ICategoryR>,
  number,
  { rejectValue: IApiResponseReject }
>(CATEGORYRS_THUNKS_TYPE.GET_BY_ID, async (id, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.delete<IApiResponseSuccess<ICategoryR>>(
      `/categoryrs/${id}`
    );
    
    return data;
  } catch (error) {
    const err = error as AxiosError<IApiResponseReject>;
    return rejectWithValue(err.response!.data);
  }
});

export const createCategoryRThunk = createAsyncThunk<
  IApiResponseSuccess<ICategoryR>,
  IRawCategoryRData,
  { rejectValue: IApiResponseReject }
>(CATEGORYRS_THUNKS_TYPE.CREATE, async (newCategoryR, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.post<IApiResponseSuccess<ICategoryR>>(
      "/categoryrs",
      newCategoryR
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
export const deleteCategoryRThunk = createAsyncThunk<
  IApiResponseSuccess<ICategoryR>,
  number,
  { rejectValue: IApiResponseReject }
>(CATEGORYRS_THUNKS_TYPE.DELETE, async (id, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.delete<IApiResponseSuccess<ICategoryR>>(
      `/categoryrs/${id}`
    );
    console.log(data.data,444);
    
    return data;
  } catch (error) {
    const err = error as AxiosError<IApiResponseReject>;
    return rejectWithValue(err.response!.data);
  }
});
export const updateCategoryRThunk = createAsyncThunk<
  IApiResponseSuccess<ICategoryR>,
  { id: number; updatedCategoryR: IRawCategoryRData },
  { rejectValue: IApiResponseReject }
>(
    CATEGORYRS_THUNKS_TYPE.UPDATE,
  async ({ id, updatedCategoryR }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put<IApiResponseSuccess<ICategoryR>>(
        `/categoryrs/${id}`,
        updatedCategoryR
      );
      return data;
    } catch (error) {
      const err = error as AxiosError<IApiResponseReject>;
      return rejectWithValue(err.response!.data);
    }
  }
);
