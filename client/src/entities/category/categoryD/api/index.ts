import { IApiResponseReject, IApiResponseSuccess } from "@/shared/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { CategoryList, CreateCategory, ICategory, UpdateCategory} from "@/entities/category";
import { axiosInstance } from "@/shared/lib/axiosInstance";
import { AxiosError } from "axios";

enum CATEGORYD_API_ROUTES {
  CATEGORY_ALL_ROUTES = '/categoryd'
}

enum CATEGORYD_THUNKS_TYPE {
  ALL = "categoryd/getAll",
  CREATE = 'categoryd/create',
  UPDATE = 'categoryd/update',
  DELETE = 'categoryd/delete'
}

export const getAllCategoryDThunk = createAsyncThunk<
  IApiResponseSuccess<CategoryList>,
  void,
  { rejectValue: IApiResponseReject }
>(CATEGORYD_THUNKS_TYPE.ALL, async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get<
      IApiResponseSuccess<CategoryList|[]>
    >(CATEGORYD_API_ROUTES.CATEGORY_ALL_ROUTES);
    if (data.statusCode !== 200  || data.data.length===0) {
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

export const createCategoryDThunk = createAsyncThunk<
  IApiResponseSuccess<ICategory>,
  CreateCategory,
  { rejectValue: IApiResponseReject }
>(CATEGORYD_THUNKS_TYPE.CREATE, async (newCategoryD, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.post<IApiResponseSuccess<ICategory>>(
      CATEGORYD_API_ROUTES.CATEGORY_ALL_ROUTES,
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
  IApiResponseSuccess<ICategory>,
  {id:number},
  { rejectValue: IApiResponseReject }
>(CATEGORYD_THUNKS_TYPE.DELETE, async ({id}, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.delete<
      IApiResponseSuccess<ICategory>
    >(CATEGORYD_API_ROUTES.CATEGORY_ALL_ROUTES, { data: { id } });
    if (data.statusCode !== 200) {
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

export const updateCategoryDThunk = createAsyncThunk<
  IApiResponseSuccess<ICategory>,
  UpdateCategory,
  { rejectValue: IApiResponseReject }
>(
  CATEGORYD_THUNKS_TYPE.UPDATE, async (updatedCategory , { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put<IApiResponseSuccess<ICategory>>(
        CATEGORYD_API_ROUTES.CATEGORY_ALL_ROUTES,
        updatedCategory
      );
      if (data.statusCode !== 200) {
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
