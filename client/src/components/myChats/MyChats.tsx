'use client'

import { Box, Spinner, Stack, Toast } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'

import { setChats } from '@/store/slices/authSlice'

import { useTypedSelector } from '@/hooks/useTypedSelector'

import { Chat } from '../chat/Chat'
import SideDrawer from '../sideDrawer/SideDrawer'
import ChatLoading from '../ui/ChatLoading'

import { chatService } from '@/services/chat.service'

const MyChats = () => {
	const dispatch = useDispatch()
	const { selectedChat, user } = useTypedSelector(state => state.auth)

	const {
		data: chats,
		isLoading,
		isSuccess,
		isError
	} = useQuery({
		queryKey: ['fetch chats', user?.id],
		queryFn: () => chatService.getAll(),
		enabled: !!user
	})

	if (isError) {
		toast.error('Fetching chats failed')
	}
	return (
		<Box
			display={{ base: selectedChat ? 'none' : 'flex', md: 'flex' }}
			flexDirection='column'
			alignItems='center'
			height='100%'
			p={3}
			bg='white'
			gap='5px'
			w={{ base: '100%', sm: '31%' }}
			borderRadius='lg'
			borderWidth='1px'
		>
			<SideDrawer />
			<Box
				pb={3}
				px={3}
				fontSize={{ base: '16px', md: '20px' }}
				display='flex'
				w='100%'
				flexDirection='column-reverse'
				alignItems='center'
				gap='5px'
			>
				My Chats
			</Box>
			<Box
				display='flex'
				flexDirection='column'
				p={3}
				bg='#F8F8F8'
				w='100%'
				h='100%'
				borderRadius='1g'
				overflowY='hidden'
			>
				{isLoading ? (
					<ChatLoading />
				) : (
					<div style={{ overflowY: 'auto', height: '100vh' }}>
						{chats?.data && chats.data.length > 0 ? (
							chats.data.map(chat => (
								<Chat
									key={chat.id}
									chat={chat}
									selectedChat={selectedChat}
									user={user}
								/>
							))
						) : (
							<div>No chats available.</div>
						)}
					</div>
				)}
			</Box>
		</Box>
	)
}

export default MyChats
