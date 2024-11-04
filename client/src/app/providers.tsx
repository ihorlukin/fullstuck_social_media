'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren, useState } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { persistor, store } from '@/store/store'

import { ThemeContext, ThemeContextProvider } from '@/context/ThemeContext'
import { SocketContextProvider } from '@/context/WebsocketContext'

export function Providers({ children }: PropsWithChildren) {
	const [client] = useState(
		new QueryClient({
			defaultOptions: {
				queries: {
					refetchOnWindowFocus: false
				}
			}
		})
	)

	return (
		<Provider store={store}>
			<PersistGate
				loading={null}
				persistor={persistor}
			>
				<QueryClientProvider client={client}>
					<ThemeContextProvider>
						<SocketContextProvider>{children}</SocketContextProvider>
					</ThemeContextProvider>
				</QueryClientProvider>
			</PersistGate>
		</Provider>
	)
}
