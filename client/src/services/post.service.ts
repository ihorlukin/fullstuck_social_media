import { IBaseResponse } from '@/types/root.types'
import { IPost } from '@/types/user.types'

import { axiosWithAuth } from '@/api/interceptors'

interface IPostDto {
	desc: string
	img: string
	authorId: string
}
class PostService {
	private BASE_URL = 'post'

	async getAll(userId: string) {
		const response = axiosWithAuth.get<IPost[]>(`${this.BASE_URL}/${userId}`)
		return response
	}

	async create(data: IPostDto) {
		const response = axiosWithAuth.post<IPost>(`${this.BASE_URL}`, data)
		return response
	}

	async delete(id: string) {
		const response = axiosWithAuth.delete<IBaseResponse>(
			`${this.BASE_URL}/${id}`
		)

		return response
	}

	async like(id: string) {
		const response = await axiosWithAuth.put(`${this.BASE_URL}/like/${id}`)

		return response
	}

	async unlike(id: string) {
		const response = await axiosWithAuth.put(`${this.BASE_URL}/unlike/${id}`)

		return response
	}

	async upload(file: FormData) {
		try {
			const data = file.get('file')
			console.log(data)
			const response = await axiosWithAuth.post(`/file`, file, {
				headers: {
					'Content-Type': 'multipart/form-data' // Явно указываем тип контента
				}
			})

			return response
		} catch (error) {
			console.error('Error uploading file:', error)
			throw error
		}
	}
}
export const postService = new PostService()
