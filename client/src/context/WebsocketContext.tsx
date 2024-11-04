import { useRadio } from '@chakra-ui/react'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { Socket, io } from 'socket.io-client'

const SERVER_URL = 'http://localhost:80'

interface SocketContextProps {
	initializeSocket: (userId: string) => void
	socket: Socket | null
	closeSocket: () => void
}
interface SocketContextProviderProps {
	children: React.ReactNode
}
export const SocketContext = createContext<SocketContextProps | undefined>(
	undefined
)

export const SocketContextProvider: React.FC<SocketContextProviderProps> = ({
	children
}) => {
	const [socket, setSocket] = useState<Socket | null>(null)
	const [id, setId] = useState<string | null>(null)
	const initializeSocket = (userId: string) => {
		if (!socket) {
			const newSocket = io(SERVER_URL)
			console.log('SocketCreated')
			newSocket.emit('user:online', userId)
			setId(userId)
			setSocket(newSocket)
		}
	}

	const closeSocket = () => {
		if (socket) {
			socket.emit('user:offline', id)
			console.log('Socket Disconected')
			socket.disconnect()
			setSocket(null) // Освобождаем ресурс
			setId(null)
			console.log('closed')
		}
	}

	useEffect(() => {
		const handleBeforeUnload = () => {
			closeSocket() // Закрываем сокет при закрытии окна
		}

		window.addEventListener('beforeunload', handleBeforeUnload)

		return () => {
			closeSocket() // Закрываем сокет при размонтировании компонента
			window.removeEventListener('beforeunload', handleBeforeUnload)
		}
	}, [socket])

	return (
		<SocketContext.Provider value={{ socket, initializeSocket, closeSocket }}>
			{children}
		</SocketContext.Provider>
	)
}

// Хук для использования контекста
export const useSocket = () => {
	const context = useContext(SocketContext)
	if (context === undefined) {
		throw new Error('useSocket must be used within a SocketProvider')
	}
	return context
}
