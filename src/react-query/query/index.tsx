import { setAuthorizationHeader } from '@/api';
import { GetUser } from '@/api/auth';
import { getSingleUser, getUsers } from '@/api/users';
import { useQuery } from '@tanstack/react-query';

export const useGetUser = ({
  isEnabled,
  accessToken,
}: {
  isEnabled: boolean;
  accessToken: string | null;
}) => {
  if (accessToken) {
    setAuthorizationHeader(`Bearer ${accessToken}`);
  }
  return useQuery({
    queryKey: ['user'],
    queryFn: GetUser,
    retry: 0,
    refetchOnWindowFocus: false,
    enabled: isEnabled,
  });
};

interface UseUsersParams {
  page: number;
  limit: number;
  searchQuery: string;
}

export const useUsers = ({ page, limit, searchQuery }: UseUsersParams) => {
  return useQuery({
    queryKey: ['users', page, searchQuery],
    queryFn: () => getUsers({ page, limit, searchQuery }),
  });
};

export const useSingleUser = (id: string | undefined) => {
  return useQuery({
    queryKey: ['users', id],
    queryFn: () => getSingleUser(id),
    enabled: !!id,
  });
};
