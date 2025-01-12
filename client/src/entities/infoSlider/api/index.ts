import { IApiResponseReject, IApiResponseSuccess } from "@/shared/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ArrayInfoSliderType } from "../model";
import { AxiosError } from "axios";
import { axiosInstance } from "@/shared/lib/axiosInstance";

export const getInfoSliderDataThunk = createAsyncThunk<
  IApiResponseSuccess<ArrayInfoSliderType>,
  void,
  { rejectValue: IApiResponseReject }
>("infoSlider/getAll", async(_, { rejectWithValue })=>{
  try {
    const {data} = await axiosInstance.get<IApiResponseSuccess<ArrayInfoSliderType>>('/infoSlider')
    return data
  } catch (error) {
       const err = error as AxiosError<IApiResponseReject>;
        return rejectWithValue(err.response!.data);
  }
});
