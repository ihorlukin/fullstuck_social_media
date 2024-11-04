'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import io, { Socket } from 'socket.io-client'

interface IChat {
	chatName: string
	id: string
	messages: []
}

const SERVER_URL = 'http://localhost:80'

export const useChat = (
	conversationId: string | undefined,
	userId: string | undefined
) => {
	const [conversation, setConversation] = useState<IChat>({} as IChat)
	const [newMessage, setNewMessage] = useState('')
	const [isConnected, setIsConnected] = useState(false)
	const [isTyping, setIsTyping] = useState(false)
	const [socket, setSocket] = useState<Socket | null>(null)

	const sendMessage = useCallback(
		async (e: React.KeyboardEvent<HTMLInputElement>) => {
			if (!socket) return
			if (e.key === 'Enter' && newMessage) {
				socket.emit('stop typing', conversationId)
				const body = {
					content: newMessage,
					chatId: conversationId,
					userId: userId
				}
				socket.emit('message:add', body)
				setNewMessage('')
			}
		},
		[newMessage, socket, conversationId, userId]
	)

	const typingTimeout = useRef<NodeJS.Timeout | null>(null)

	const typingHandler = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			if (!socket) return

			const value = e.target.value
			setNewMessage(value)

			if (!isTyping) {
				setIsTyping(true)
				socket.emit('typing', conversationId)
			}

			// Очистка предыдущего таймера
			if (typingTimeout.current) {
				clearTimeout(typingTimeout.current)
			}

			// Установка нового таймера
			typingTimeout.current = setTimeout(() => {
				socket.emit('stop typing', conversationId)
				setIsTyping(false)
			}, 3000)
		},
		[socket, isTyping, conversationId]
	)

	useEffect(() => {
		if (!socket) {
			console.log('Socket Failed')
			return
		}

		socket.emit('message:get', { conversationId })

		const handleConversation = (conversation: IChat) => {
			setConversation(conversation)
		}

		const handleConnect = () => {
			console.log('connected')
			socket.emit('joinRoom', { conversationId })
		}

		const handleJoinedRoom = (room: string) => {
			setIsConnected(true)
		}

		const handleLeftRoom = (room: string) => {
			setIsConnected(false)
		}

		const handleTyping = () => setIsTyping(true)
		const handleStopTyping = () => setIsTyping(false)

		// Регистрация обработчиков событий
		socket.on('conversation', handleConversation) // conversation будет передан как аргумент
		socket.on('connect', handleConnect)
		socket.on('joinedRoom', handleJoinedRoom)
		socket.on('leftRoom', handleLeftRoom)
		socket.on('typing', handleTyping)
		socket.on('stop typing', handleStopTyping)

		return () => {
			socket.off('conversation', handleConversation)
			socket.off('connect', handleConnect)
			socket.off('joinedRoom', handleJoinedRoom)
			socket.off('leftRoom', handleLeftRoom)
			socket.off('typing', handleTyping)
			socket.off('stop typing', handleStopTyping)

			socket.emit('leaveRoom', { conversationId })
			socket.disconnect()
			setIsConnected(false)
		}
	}, [conversationId, socket])

	return {
		conversation,
		sendMessage,
		typingHandler,
		isConnected,
		isTyping,
		newMessage
	}
}
