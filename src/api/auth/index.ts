import axios from 'axios';
import { httpClient } from '..';
import { AUTH_ENDPOINTS } from './index.enum';
import { LoginFormValues } from '@/pages/login/components/types';

// Utility for handling Axios errors
const handleAxiosError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message || 'An error occurred';
    const status = error.response?.status;
    if (status) {
      if (status >= 400 && status < 500) {
        alert('Error');
      }
    }
    throw new Error(message);
  }
  throw new Error('An unknown error occurred');
};

export const Login = async (data: LoginFormValues) => {
  try {
    const { data: result } = await httpClient.post(AUTH_ENDPOINTS.LOGIN, data);
    if (!result) {
      alert('Invalid username or password. Please try again.');
    }
    return result;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const GetUser = async () => {
  try {
    const { data: user } = await httpClient.get(AUTH_ENDPOINTS.ME);
    return user;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const refresh = async ({ payload }: any) => {
  try {
    const { data } = await httpClient.post(AUTH_ENDPOINTS.REFRESH, payload);
    return data;
  } catch (error) {
    handleAxiosError(error);
  }
};
