'use client'

import { DarkMode } from '@chakra-ui/react'
import { useContext, useEffect } from 'react'

import { useTypedSelector } from '@/hooks/useTypedSelector'

import '../app/globals.scss'

import { ThemeContext } from '@/context/ThemeContext'
import { useSocket } from '@/context/WebsocketContext'

export default function StartLayout({
	children
}: {
	children: React.ReactNode
}) {
	const context = useContext(ThemeContext)
	if (!context) {
		throw new Error('useDarkMode must be used within a DarkModeContextProvider')
	}
	const { darkMode } = context

	console.log(darkMode)
	const { socket, closeSocket, initializeSocket } = useSocket()
	const user = useTypedSelector(state => state.auth.user)

	useEffect(() => {
		document.documentElement.setAttribute(
			'data_mode',
			darkMode ? 'dark' : 'light'
		)
	}, [darkMode])
	useEffect(() => {
		if (!socket && user?.id) {
			initializeSocket(user.id)
		}
	}, [socket])
	return <>{children}</>
}
