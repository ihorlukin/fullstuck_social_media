import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { IAuthResponse, ILoginForm, IRegisterForm } from '@/types/auth.types'

import { axiosClassic } from '@/api/interceptors'

import { removeFromStorage, saveTokenStorage } from './auth-token.service'

export const authService = {
	async main(type: 'login' | 'register', data: ILoginForm | IRegisterForm) {
		try {
			const response = await axiosClassic.post<IAuthResponse>(
				`/auth/${type}`,
				data
			)

			if (response.data.accessToken) saveTokenStorage(response.data.accessToken)
			return response.data
		} catch (error: any) {
			// Обработка ошибок
			if (axios.isAxiosError(error)) {
				console.log(error)
				// Вы можете передать ошибку с дополнительной информацией
				throw new Error(error.response?.data?.message || 'An error occurred')
			} else {
				// Обработка неизвестных ошибок
				throw new Error('An unexpected error occurred')
			}
		}
	},

	async getNewTokens() {
		const response = await axiosClassic.post<IAuthResponse>(
			'/auth/login/access-token'
		)

		if (response.data.accessToken) saveTokenStorage(response.data.accessToken)

		return response
	},

	async logout() {
		const response = await axiosClassic.post<boolean>('/auth/logout')

		if (response.data) removeFromStorage()

		return response
	}
}
