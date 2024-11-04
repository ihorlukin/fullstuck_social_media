import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'

import { IUser } from '@/types/user.types'

import { setLogin } from '@/store/slices/authSlice'

import { userService } from '@/services/user.service'

export function useFollow(isFriend: boolean, friendId: string) {
	const queryClient = useQueryClient()
	const dispatch = useDispatch()
	const { mutate: follow, data } = useMutation({
		mutationKey: ['follow', friendId],
		mutationFn: () => userService.follow(friendId),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['profile', friendId]
			})
		}
	})

	const { mutate: unfollow, data: unfollowData } = useMutation({
		mutationKey: ['unfollow', friendId],
		mutationFn: () => userService.unfollow(friendId),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['profile', friendId]
			})
		}
	})

	const toggleFollow = isFriend ? unfollow : follow

	return { toggleFollow }
}
