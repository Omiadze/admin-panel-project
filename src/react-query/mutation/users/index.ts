import { useMutation } from "@tanstack/react-query";
import { addNewUser, deleteUserById, updateUser } from "@/api/users";
import { UpdateOrCreateUserFormValues } from "@/pages/dashboard/types";
import { queryClient } from "@/main";

export const useUpdateUser = (
  id: string | undefined,
  onSuccess: () => void,
  onError: () => void
) => {
  return useMutation({
    mutationKey: ["update-user"],
    mutationFn: (payload: UpdateOrCreateUserFormValues) =>
      updateUser(id, payload),
    onSuccess: onSuccess,
    onError: onError,
  });
};

export const useAddUser = (onSuccess: () => void, onError: () => void) => {
  return useMutation({
    mutationKey: ["add-user"],
    mutationFn: (payload: UpdateOrCreateUserFormValues) => addNewUser(payload),
    onSuccess: onSuccess,
    onError: onError,
  });
};

export const useDeleteUser = (onSuccess: () => void) => {
  return useMutation({
    mutationKey: ["delete-user-by-id"],
    mutationFn: (id: number) => deleteUserById({ id }),
    onSuccess: () => {
      // Invalidate queries after successful delete to refetch data
      queryClient.invalidateQueries({ queryKey: ["user"] });
      onSuccess(); // You can pass a custom onSuccess callback here if needed
    },
  });
};
