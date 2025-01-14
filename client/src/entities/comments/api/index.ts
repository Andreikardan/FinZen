import { IApiResponseReject, IApiResponseSuccess } from "@/shared/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IComment, ICommentText } from "../model";
import { AxiosError } from "axios";
import { axiosInstance } from "@/shared/lib/axiosInstance";

export const updateCommentThunk = createAsyncThunk<
  IApiResponseSuccess<IComment>,
  { id: number; text: ICommentText },
  { rejectValue: IApiResponseReject }
>("comment/update", async ({ id, text }, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.put<IApiResponseSuccess<IComment>>(
      "/comments",
      { id, text }
    );
    return data;
  } catch (error) {
    const err = error as AxiosError<IApiResponseReject>;
    return rejectWithValue(err.response!.data);
  }
});
