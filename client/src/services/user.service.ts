import { IBaseResponse, IType2, IValueForType2 } from '@/types/root.types'
import {
	ISearchUsersByFiltersResponse,
	IUnique,
	IUser,
	SearchQuery
} from '@/types/user.types'

import { axiosWithAuth } from '@/api/interceptors'

export interface IUserUpdate {
	country: string
	type1: string
	usertype: string
	city: string
	website: string
	profilePic: string
	coverPic: string
}
class UserService {
	private BASE_URL = '/profile'

	async getProfile() {
		const response = axiosWithAuth.get<IUser>(this.BASE_URL)

		return response
	}

	async getOne(id: string | string[]) {
		const response = axiosWithAuth.get<IUser>(`${this.BASE_URL}/${id}`)
		return response
	}

	async updateProfile(data: IUserUpdate) {
		const response = axiosWithAuth.patch<IUser>(`/profile`, data)

		return response
	}

	async searchUsers(query: string) {
		const response = await axiosWithAuth.get<IUser[]>(
			`${this.BASE_URL}/search-users?search=${query}`
		)
		return response
	}

	async follow(id: string) {
		const response = axiosWithAuth.put<IBaseResponse>(
			`${this.BASE_URL}/follow/${id}`
		)
		return response
	}

	async unfollow(id: string) {
		const response = axiosWithAuth.put<IBaseResponse>(
			`${this.BASE_URL}/unfollow/${id}`
		)
		return response
	}

	async getFollowing(id: string) {
		const response = await axiosWithAuth.get<IUser[]>(
			`${this.BASE_URL}/get-following/${id}`
		)
		console.log(response.data)
		return response
	}

	async getFollowers(id: string) {
		const response = axiosWithAuth.get<IUser[]>(
			`${this.BASE_URL}/get-followers/${id}`
		)
		return response
	}

	async getUsersByFilters(data: SearchQuery) {
		const response = await axiosWithAuth.post<ISearchUsersByFiltersResponse[]>(
			`${this.BASE_URL}/search-users-by-filters`,
			data
		)
		return response
	}

	async getValueForType2(values: IValueForType2) {
		const response = await axiosWithAuth.post<string[]>(
			`${this.BASE_URL}/get-values-for-type-2`,
			values
		)

		return response.data
	}

	async getUniqueValues() {
		const response = await axiosWithAuth.get<IUnique[]>(
			`${this.BASE_URL}/unique`
		)

		return response.data
	}
}

export const userService = new UserService()
