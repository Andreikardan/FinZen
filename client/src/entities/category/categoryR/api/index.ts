import { IApiResponseReject, IApiResponseSuccess } from "@/shared/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { CategoryList, CreateCategory, ICategory, UpdateCategory} from "@/entities/category";
import { axiosInstance } from "@/shared/lib/axiosInstance";
import { AxiosError } from "axios";

enum CATEGORYR_API_ROUTES {
  CATEGORY_ALL_ROUTES = '/categoryr'
}

enum CATEGORYR_THUNKS_TYPE {
  ALL = "categoryr/getAll",
  CREATE = 'categoryr/create',
  UPDATE = 'categoryr/update',
  DELETE = 'categoryr/delete'
}

export const getAllCategoryRThunk = createAsyncThunk<
  IApiResponseSuccess<CategoryList>,
  void,
  { rejectValue: IApiResponseReject }
>(CATEGORYR_THUNKS_TYPE.ALL, async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get<
      IApiResponseSuccess<CategoryList|[]>
    >(CATEGORYR_API_ROUTES.CATEGORY_ALL_ROUTES);
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

export const createCategoryRThunk = createAsyncThunk<
  IApiResponseSuccess<ICategory>,
  CreateCategory,
  { rejectValue: IApiResponseReject }
>(CATEGORYR_THUNKS_TYPE.CREATE, async (newCategoryR, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.post<IApiResponseSuccess<ICategory>>(
      CATEGORYR_API_ROUTES.CATEGORY_ALL_ROUTES,
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
  IApiResponseSuccess<ICategory>,
  {id:number},
  { rejectValue: IApiResponseReject }
>(CATEGORYR_THUNKS_TYPE.DELETE, async ({id}, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.delete<
      IApiResponseSuccess<ICategory>
    >(CATEGORYR_API_ROUTES.CATEGORY_ALL_ROUTES, { data: { id } });
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

export const updateCategoryRThunk = createAsyncThunk<
  IApiResponseSuccess<ICategory>,
  UpdateCategory,
  { rejectValue: IApiResponseReject }
>(
  CATEGORYR_THUNKS_TYPE.UPDATE, async (updatedCategory , { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put<IApiResponseSuccess<ICategory>>(
        CATEGORYR_API_ROUTES.CATEGORY_ALL_ROUTES,
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
