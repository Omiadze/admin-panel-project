import axios from "axios";
import { httpClient } from "..";
import { AUTH_ENDPOINTS } from "./index.enum";
import { LoginFormValues } from "@/pages/login/components/types";

export const Login = async (data: LoginFormValues) => {
  try {
    const result = await httpClient.post(AUTH_ENDPOINTS.LOGIN, data);
    return result.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        alert("Your Email or password is incorrect");
      }
      throw new Error(error.response?.data?.message || "Failed to login");
    }
  }
};

export const GetUser = async () => {
  try {
    const result = await httpClient.get(AUTH_ENDPOINTS.ME);
    return result.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to Get User");
    }
  }
};
export const refresh = ({ payload }: any) => {
  return httpClient
    .post(AUTH_ENDPOINTS.REFRESH, payload)
    .then((res) => res.data);
};
