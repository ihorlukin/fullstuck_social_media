import { useMutation, useQueryClient } from '@tanstack/react-query'

import { chatService } from '@/services/chat.service'

export const useCreateChat = (userId: string) => {
	const queryClient = useQueryClient()
	const { mutate, data, isSuccess } = useMutation({
		mutationKey: ['create chat'],
		mutationFn: (id: string) => chatService.create(id),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['fetch chats', userId]
			})
		}
	})

	return { mutate, data, isSuccess }
}
