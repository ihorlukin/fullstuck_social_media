import { ICommentDto } from '@/types/comment.types'
import { IComment } from '@/types/user.types'

import { axiosWithAuth } from '@/api/interceptors'

class CommentService {
	private BASE_URL = 'comment'

	async getAll(postId: string) {
		const response = axiosWithAuth.get<IComment[]>(`${this.BASE_URL}/${postId}`)

		return response
	}

	async create(data: ICommentDto) {
		console.log(data)
		const response = axiosWithAuth.post<IComment>(`${this.BASE_URL}`, data)
		return response
	}

	async delete(id: string) {
		const response = axiosWithAuth.delete(`${this.BASE_URL}/${id}`)
		return response
	}
}

export const commentService = new CommentService()
