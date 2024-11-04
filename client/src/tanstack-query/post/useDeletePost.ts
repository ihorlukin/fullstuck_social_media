import { useMutation, useQueryClient } from '@tanstack/react-query'

import { IPost } from '@/types/user.types'

import { postService } from '@/services/post.service'

export function useDeletePost(post: IPost) {
	const queryClient = useQueryClient()

	const { mutate: deletePostMutation } = useMutation({
		mutationKey: ['delete post'],
		mutationFn: () => postService.delete(post.id),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['posts', post.authorId]
			})
		}
	})

	return { deletePostMutation }
}
