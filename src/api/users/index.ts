import { httpClient } from "..";
import { GetUsersResponse, User } from "./index.types";

export const getUsers = async ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}): Promise<GetUsersResponse> => {
  const skip = (page - 1) * limit;
  try {
    const result = await httpClient.get<{
      users: User[];
      total: number;
    }>(`/users?limit=${limit}&skip=${skip}`);
    console.log(result.data);
    return {
      users: result.data.users,
      total: result.data.total,
      totalPages: Math.ceil(result.data.total / limit),
    };
  } catch (error) {
    console.log("Error:", error);
    throw new Error("Failed to fetch blogs");
  }
};

export const getSingleUser = async (id: string | undefined) => {
  try {
    if (!id) {
      throw new Error("User ID is undefined");
    }
    console.log("payload", id);
    const result = await httpClient.get(`/users/${id}`);
    return result.data;
  } catch (error) {
    console.log("Error:", error);
    throw new Error("Failed to fetch blogs");
  }
};

export const deleteUserById = async ({ id }: { id: number }) => {
  try {
    const result = await httpClient.delete(`/users/${id}`);
    console.log(result.data);
  } catch (error) {
    console.log("Error:", error);
    throw new Error("Failed to fetch blogs");
  }
};

export const addNewUser = async (payload: any) => {
  try {
    console.log("payload", payload);
    const result = await httpClient.post(`/users/add`, payload);
    console.log(result.data);
  } catch (error) {
    console.log("Error:", error);
    throw new Error("Failed to fetch blogs");
  }
};

export const updateUser = async (id: string | undefined, payload: any) => {
  try {
    console.log("payload", id);
    const result = await httpClient.put(`/users/${id}`, payload);
    console.log(result.data);
  } catch (error) {
    console.log("Error:", error);
    throw new Error("Failed to fetch blogs");
  }
};
