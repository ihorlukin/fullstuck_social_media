'use client'

import MyChats from '@/components/myChats/MyChats'
import ChatBox from '@/components/ui/chatBox/ChatBox'

import { useTypedSelector } from '@/hooks/useTypedSelector'

import './chat.scss'

export const ChatScreen = () => {
	const user = useTypedSelector(state => state.auth.user)

	return (
		<div className='chat'>
			<div className='div'>
				{user && <MyChats />}
				{user && <ChatBox />}
			</div>
		</div>
	)
}
