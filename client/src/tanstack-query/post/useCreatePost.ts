import { postService } from "@/services/post.service";
import { IPostDto } from "@/types/post.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreatePost(
  id: string, 
) {

  const queryClient = useQueryClient();

  const { mutate: CreatePostMutation, isSuccess } = useMutation({
    mutationKey: ['create post', id],
    mutationFn: (data: IPostDto) => postService.create(data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['posts', id]
      });
    }
  });

  return { CreatePostMutation, isSuccess}

}

