import { useQuery } from '@tanstack/react-query'

import { userService } from '@/services/user.service'

export function useFindProfile(id: string) {
	const { data, refetch, isLoading } = useQuery({
		queryKey: ['profile', id],
		queryFn: () => userService.getOne(id),
		select: data => data.data
	})

	return { data, refetch, isLoading }
}
