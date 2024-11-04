import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import People from './People'

export const metadata: Metadata = {
	title: 'People',
	...NO_INDEX_PAGE
}

export default function PeoplePage() {
	return <People/>
}