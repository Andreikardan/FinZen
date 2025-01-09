import { IApiResponseReject, IApiResponseSuccess } from "@/shared/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IRawCategoryDData, ICategoryD, ArrayCategoryDsType } from "../model";
import { axiosInstance } from "@/shared/lib/axiosInstance";
import { AxiosError } from "axios";

enum CATEGORYDS_THUNKS_TYPE {
  GET_ALL = "categoryd/getAll",
  GET_BY_ID = "categoryd/getById",
  CREATE = "categoryd/create",
  DELETE = "categoryd/delete",
  UPDATE = "categoryd/update",
}

export const getAllCategoryDsThunk = createAsyncThunk<
  IApiResponseSuccess<ArrayCategoryDsType>,
  void,
  { rejectValue: IApiResponseReject }
>(CATEGORYDS_THUNKS_TYPE.GET_ALL, async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get<
      IApiResponseSuccess<ArrayCategoryDsType>
    >("/categoryds");

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

export const getCategoryDByIdThunk = createAsyncThunk<
  IApiResponseSuccess<ICategoryD>,
  number,
  { rejectValue: IApiResponseReject }
>(CATEGORYDS_THUNKS_TYPE.GET_BY_ID, async (id, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.delete<IApiResponseSuccess<ICategoryD>>(
      `/categoryds/${id}`
    );
    
    return data;
  } catch (error) {
    const err = error as AxiosError<IApiResponseReject>;
    return rejectWithValue(err.response!.data);
  }
});


export const createCategoryDThunk = createAsyncThunk<
  IApiResponseSuccess<ICategoryD>,
  IRawCategoryDData,
  { rejectValue: IApiResponseReject }
>(CATEGORYDS_THUNKS_TYPE.CREATE, async (newCategoryD, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.post<IApiResponseSuccess<ICategoryD>>(
      "/categoryds",
      newCategoryD
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
export const deleteCategoryDThunk = createAsyncThunk<
  IApiResponseSuccess<ICategoryD>,
  number,
  { rejectValue: IApiResponseReject }
>(CATEGORYDS_THUNKS_TYPE.DELETE, async (id, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.delete<
      IApiResponseSuccess<ICategoryD>
    >(`/categoryds/${id}`);
    console.log(data.data, 444);

    return data;
  } catch (error) {
    const err = error as AxiosError<IApiResponseReject>;
    return rejectWithValue(err.response!.data);
  }
});
export const updateCategoryDThunk = createAsyncThunk<
  IApiResponseSuccess<ICategoryD>,
  { id: number; updatedCategoryD: IRawCategoryDData },
  { rejectValue: IApiResponseReject }
>(
  CATEGORYDS_THUNKS_TYPE.UPDATE,
  async ({ id, updatedCategoryD }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put<IApiResponseSuccess<ICategoryD>>(
        `/categoryds/${id}`,
        updatedCategoryD
      );
      return data;
    } catch (error) {
      const err = error as AxiosError<IApiResponseReject>;
      return rejectWithValue(err.response!.data);
    }
  }
);
