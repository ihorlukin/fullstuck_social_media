import type { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'

import StartLayout from '@/components/StartLayout'

import { SITE_NAME } from '@/constants/seo.constants'

import './globals.scss'
import { Providers } from './providers'

export const metadata: Metadata = {
	title: {
		default: SITE_NAME,
		template: `%s | ${SITE_NAME}`
	},
	description: 'Best one for planning from RED GROUP [htmllessons.ru]'
}

export default function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<html>
			<body>
				<Providers>
					<StartLayout>{children}</StartLayout>
				</Providers>
			</body>
		</html>
	)
}
