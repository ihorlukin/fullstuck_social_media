import { IUserUpdate, userService } from "@/services/user.service";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateProfile(
  userId: string
) {

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ['update profile'],
    mutationFn: (user: IUserUpdate) => userService.updateProfile(user),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['profile', userId]
      });
    }
  });

  return {mutate}

}