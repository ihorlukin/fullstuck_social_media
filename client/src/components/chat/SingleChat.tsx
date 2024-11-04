'use client'

import { ArrowBackIcon } from '@chakra-ui/icons'
import {
	Box,
	FormControl,
	IconButton,
	Input,
	Spinner,
	Text
} from '@chakra-ui/react'
import React from 'react'
import { useDispatch } from 'react-redux'

import { resetSelectedChat } from '@/store/slices/authSlice'

import { useChat } from '@/hooks/useChat'
import { useTypedSelector } from '@/hooks/useTypedSelector'

import TypingAnimation from '../ui/TypingAnimation/TypingAnimation'

import ScrollableChat from './scrollableChat'
import { getSender } from '@/utils'

const SingleChat = () => {
	const dispatch = useDispatch()
	const { selectedChat, user } = useTypedSelector(state => state.auth)
	console.log('Selected Chat', selectedChat)
	console.log('USER', user)
	const {
		conversation,
		sendMessage,
		typingHandler,
		isConnected,
		isTyping,
		newMessage
	} = useChat(selectedChat?.id, user?.id)
	return (
		<>
			{selectedChat ? (
				<>
					<Text
						fontSize={{ base: '28px', md: '30px' }}
						pb={3}
						px={2}
						w='100%'
						display='flex'
						justifyContent={{ base: 'space-between' }}
						alignItems='center'
					>
						<IconButton
							display={{ base: 'flex', md: 'none' }}
							icon={<ArrowBackIcon />}
							onClick={() => dispatch(resetSelectedChat())}
							aria-label='go back'
						/>
						{getSender(user, selectedChat.users)}
					</Text>
					<Box
						display='flex'
						flexDirection='column'
						justifyContent='flex-end'
						p={3}
						bg='#E8E8E8'
						w='100%'
						h='100%'
						borderRadius='lg'
						overflowY='hidden'
					>
						{!user ? (
							<Spinner
								size='xl'
								w={20}
								h={20}
								alignSelf='center'
								margin='auto'
							/>
						) : (
							<div className='messages'>
								<ScrollableChat messages={conversation.messages} />
							</div>
						)}

						<FormControl
							onKeyDown={sendMessage}
							isRequired
							mt={3}
						>
							{isTyping ? <TypingAnimation /> : <></>}
							<Input
								variant='filled'
								bg='E0E0E0'
								placeholder='Enter a message...'
								onChange={typingHandler}
								value={newMessage}
							/>
						</FormControl>
					</Box>
				</>
			) : (
				<Box
					display='flex'
					alignItems='center'
					justifyContent='center'
					h='100%'
				>
					<Text
						fontSize='3xl'
						pb={3}
					>
						Click on a user to start chatting
					</Text>
				</Box>
			)}
		</>
	)
}

export default SingleChat
