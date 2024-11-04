import { useMutation, useQueryClient } from '@tanstack/react-query'

import { ILikePost } from '@/types/post.types'

import { postService } from '@/services/post.service'

export function useLikePost(dto: ILikePost) {
	const queryClient = useQueryClient()

	const { mutate: likeMutation } = useMutation({
		mutationKey: ['like post', dto.id],
		mutationFn: () => postService.like(dto.id),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['posts', dto.postAuthorId]
			})
		}
	})

	const { mutate: unlikeMutation } = useMutation({
		mutationKey: ['unlike post', dto.id],
		mutationFn: () => postService.unlike(dto.id), // Предположим, что у вас есть `unlike` функция в `postService`
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['posts', dto.postAuthorId]
			})
		}
	})

	const toggleLike = dto.isLiked ? unlikeMutation : likeMutation
	return { toggleLike }
}
