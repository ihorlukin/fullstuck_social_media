import { createSlice } from '@reduxjs/toolkit'

import { IChat, IUser } from '@/types/user.types'

export interface IUserInitialState {
	user: IUser | null
	isLoading: boolean
	selectedChat: IChat | null
	darkMode: boolean
	chats: IChat | []
}

export const initialState: IUserInitialState = {
	user: null,
	isLoading: false,
	selectedChat: null,
	darkMode: false,
	chats: []
}
export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setLogin: (state, action) => {
			console.log(action.payload)
			state.user = action.payload
		},
		setLogout: state => {
			state.user = null
		},
		toggleMode: state => {
			state.darkMode = !state.darkMode
		},
		setSelectedChat: (state, action) => {
			state.selectedChat = action.payload.chat
		},
		setChats: (state, action) => (state.chats = action.payload),
		resetSelectedChat: state => {
			state.selectedChat = null
		}
	}
})

export const {
	setLogin,
	setLogout,
	setSelectedChat,
	resetSelectedChat,
	toggleMode,
	setChats
} = authSlice.actions
export default authSlice.reducer
