import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { ChatScreen } from './ChatScreen'

export const metadata: Metadata = {
	title: 'Chat',
	...NO_INDEX_PAGE
}

export default function ChatPage() {
	return <ChatScreen />
}
