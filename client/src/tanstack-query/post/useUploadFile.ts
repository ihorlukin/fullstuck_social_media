import { useMutation } from '@tanstack/react-query'

import { postService } from '@/services/post.service'

export const useUploadFile = () => {
	const { mutate, data, isSuccess } = useMutation({
		mutationKey: ['upload'],
		mutationFn: (data: FormData) => postService.upload(data)
	})

	return { mutate, data, isSuccess }
}
