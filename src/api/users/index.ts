import { UpdateOrCreateUserFormValues } from '@/pages/dashboard/types';
import { httpClient } from '..';
import { GetUsersResponse, User } from './index.types';

export const getUsers = async ({
  page,
  limit,
  searchQuery = '',
}: {
  page: number;
  limit: number;
  searchQuery?: string;
}): Promise<GetUsersResponse> => {
  const skip = (page - 1) * limit;
  const searchParam = searchQuery ? `search?q=${searchQuery}` : '';
  try {
    if (searchParam != '') {
      const result = await httpClient.get<{
        users: User[];
        total: number;
      }>(`/users/${searchParam}`);

      return {
        users: result.data.users,
        total: result.data.total,
        totalPages: Math.ceil(result.data.total / limit),
      };
    } else {
      const result = await httpClient.get<{
        users: User[];
        total: number;
      }>(`/users?limit=${limit}&skip=${skip}`);

      return {
        users: result.data.users,
        total: result.data.total,
        totalPages: Math.ceil(result.data.total / limit),
      };
    }
  } catch (error) {
    throw new Error('Failed to fetch users');
  }
};

export const getSingleUser = async (id: string | undefined) => {
  try {
    if (!id) {
      throw new Error('User ID is undefined');
    }

    const result = await httpClient.get(`/users/${id}`);
    return result.data;
  } catch (error) {
    throw new Error('Failed to fetch user');
  }
};

export const deleteUserById = async ({ id }: { id: number }) => {
  try {
    const result = await httpClient.delete(`/users/${id}`);
    console.log(result.data);
  } catch (error) {
    throw new Error('Failed to delete user');
  }
};

export const addNewUser = async (payload: UpdateOrCreateUserFormValues) => {
  try {
    const result = await httpClient.post(`/users/add`, payload);
    console.log(result.data);
  } catch (error) {
    throw new Error('Failed to add user');
  }
};

export const updateUser = async (
  id: string | undefined,
  payload: UpdateOrCreateUserFormValues,
) => {
  try {
    const result = await httpClient.put(`/users/${id}`, payload);
    console.log(result.data);
  } catch (error) {
    throw new Error('Failed to update user');
  }
};
