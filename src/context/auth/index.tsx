import { User } from '@/api/users/index.types';
import { useHttpInterceptor } from '@/hooks/useHttpInterceptor';
import { useGetUser } from '@/react-query/query';
import { Loader } from 'lucide-react';
import { createContext, PropsWithChildren } from 'react';

type AuthContextType = {
  user: User | null;
};

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const accessToken = localStorage.getItem('accessToken');
  useHttpInterceptor();
  const { data: user, isFetching: isUserLoading } = useGetUser({
    isEnabled: !!accessToken,
    accessToken,
  });

  return (
    <AuthContext.Provider value={{ user }}>
      {isUserLoading ? <Loader /> : children}
    </AuthContext.Provider>
  );
};
