import { commentService } from "@/services/comment.service"
import { ICommentDto } from "@/types/comment.types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export function useCreateComment(postId: string){

  const queryClient = useQueryClient()
  const { mutate, isPending, error } = useMutation({
		mutationKey: ['create Comment'],
		mutationFn: (dto: ICommentDto) => commentService.create(dto),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['comments', postId]
      })
    }
	})

  return { mutate, isPending, error } 
}