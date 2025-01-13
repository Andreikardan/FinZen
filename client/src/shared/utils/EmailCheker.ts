import { axiosInstance } from '@/shared/lib/axiosInstance';
import type { IApiResponseReject, IApiResponseSuccess } from '@/shared/types';
import { handleAxiosError } from './handleAxiosError';

type IsUserEmailExistsType = {
  exists: boolean;
};

export const isEmailExistsChecker = async (
  email: string,
): Promise<IApiResponseSuccess<IsUserEmailExistsType> | IApiResponseReject> => {
  try {
    const { data } = await axiosInstance.post<IApiResponseSuccess<IsUserEmailExistsType>>(
      '/auth/check-email',
      { email },
    );
    return data;
  } catch (error) {
    return handleAxiosError(error);
  }
};