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
    }>(`/users?limit=${limit}&skip=${skip}&select=username,email,age,role`);
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
