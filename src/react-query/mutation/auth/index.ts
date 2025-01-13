import { Login } from '@/api/auth';
import { useMutation } from '@tanstack/react-query';

export const useLogin = (
  onSuccess: (res: {
    accessToken: string;
    refreshToken: string;
    id: number;
  }) => void,
) => {
  return useMutation({
    mutationKey: ['login'],
    mutationFn: Login,
    onSuccess: onSuccess,
  });
};
