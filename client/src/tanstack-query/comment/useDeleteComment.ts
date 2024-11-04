import { useMutation, useQueryClient } from '@tanstack/react-query'

import { commentService } from '@/services/comment.service'

export const useDeleteComment = (postId: string, commentId: string) => {
	const queryClient = useQueryClient()

	const {
		mutate: deleteComment,
		isPending,
		error
	} = useMutation({
		mutationKey: ['delete comment'],
		mutationFn: () => commentService.delete(commentId),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['comments', postId]
			})
		}
	})

	return { deleteComment, isPending, error }
}
