import { Login } from '@/api/auth';
import { useMutation } from '@tanstack/react-query';

export const useLogin = (onSuccess: (res: any) => void) => {
  return useMutation({
    mutationKey: ['login'],
    mutationFn: Login,
    onSuccess: onSuccess,
  });
};
