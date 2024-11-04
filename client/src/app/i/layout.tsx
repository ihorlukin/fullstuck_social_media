import { calculateOverrideValues } from 'next/dist/server/font-utils'
import { Toaster } from 'react-hot-toast'

import LeftBar from '@/components/leftBar/LeftBar'
import Navbar from '@/components/navbar/Navbar'

import { useTypedSelector } from '@/hooks/useTypedSelector'

import '../../app/globals.scss'

import { useSocket } from '@/context/WebsocketContext'

export default function MainLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<div style={{ overflow: 'hidden' }}>
			<Navbar />
			<div style={{ display: 'flex' }}>
				<LeftBar />
				<Toaster position='top-center' />
				<div style={{ flex: 6 }}>{children}</div>
			</div>
		</div>
	)
}
