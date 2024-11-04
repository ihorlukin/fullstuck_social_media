import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { Friends } from './Friends'

export const metadata: Metadata = {
	title: 'Friends',
	...NO_INDEX_PAGE
}

export default function LoginPage() {
	return <Friends />
}