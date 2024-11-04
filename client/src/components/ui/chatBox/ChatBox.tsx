import { Box } from '@chakra-ui/react'
import React from 'react'

import { useTypedSelector } from '@/hooks/useTypedSelector'

import SingleChat from '../../chat/SingleChat'

import './chatBox.scss'

const ChatBox = () => {
	const { selectedChat } = useTypedSelector(state => state.auth)

	return (
		<div className={`chatBox ${selectedChat ? 'selected' : ''}`}>
			<SingleChat />
		</div>
	)
}

export default ChatBox
