import { setAuthorizationHeader } from "@/api";

export const AfterLoginSuccessn = ({
  accessToken,
  refreshToken,
  userId,
}: {
  accessToken: string | undefined;
  refreshToken: string | undefined;
  userId: number | null | undefined;
}) => {
  localStorage.setItem("accessToken", accessToken || "");
  localStorage.setItem("refreshToken", refreshToken || "");
  localStorage.setItem("userId", userId?.toString() || "");
  setAuthorizationHeader(`Bearer ${accessToken}`);
};
