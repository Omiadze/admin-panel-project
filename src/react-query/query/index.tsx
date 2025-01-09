import { setAuthorizationHeader } from "@/api";
import { GetUser } from "@/api/auth";
import { useQuery } from "@tanstack/react-query";

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
    queryKey: ["user"],
    queryFn: GetUser,
    retry: 0,
    refetchOnWindowFocus: false,
    enabled: isEnabled,
  });
};
