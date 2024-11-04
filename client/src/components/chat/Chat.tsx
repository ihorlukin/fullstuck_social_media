'use client'

import { Box, Button, Text } from '@chakra-ui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FC } from 'react'
import { useDispatch } from 'react-redux'

import { IChat, IUser } from '@/types/user.types'

import { setSelectedChat } from '@/store/slices/authSlice'

import { chatService } from '@/services/chat.service'

interface ChatProps {
	chat: IChat | null
	selectedChat: IChat | null
	user: IUser | null
}
export const Chat: FC<ChatProps> = ({ chat, selectedChat, user }) => {
	if (!chat || !user) return <>Loading</>
	console.log('user', user, 'selectedChat', selectedChat)
	const queryClient = useQueryClient()
	const dispatch = useDispatch()
	const { mutate } = useMutation({
		mutationKey: ['delete chat'],
		mutationFn: () => chatService.delete(chat.id),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['fetch chats', user.id]
			})
		}
	})
	return (
		<Box
			onClick={() => dispatch(setSelectedChat({ chat }))}
			cursor='pointer'
			bg={selectedChat === chat ? '#38B2AC' : '#E8E8E8'}
			color={selectedChat === chat ? 'white' : 'black'}
			px={3}
			py={2}
			borderRadius='lg'
			key={chat.id}
			height='30px'
			display='flex'
			justifyContent='space-between'
		>
			<Box>
				{chat.latestMessage ? (
					<Text fontSize='xs'>
						<b>{chat?.latestMessage?.sender?.username} : </b>
						{chat.latestMessage.content.length > 50
							? chat.latestMessage.content.substring(0, 51) + '...'
							: chat.latestMessage.content}
					</Text>
				) : (
					chat.users
						.filter(u => u.id !== user.id) // Фильтрация для исключения текущего пользователя
						.map(u => (
							<p key={u.id}>{u.username}</p> // Не забудьте добавить уникальный `key` для каждого элемента
						))
				)}
			</Box>
			{selectedChat?.id === chat.id && (
				<Button
					className='button'
					onClick={() => mutate()}
				>
					Удалить
				</Button>
			)}
		</Box>
	)
}
