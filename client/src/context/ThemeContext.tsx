import React from 'react'
import { createContext, useEffect, useState } from 'react'

interface ThemeContextType {
	darkMode: boolean
	toggle: () => void
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
	undefined
)

interface DarkModeContextProviderProps {
	children: React.ReactNode
}
export const ThemeContextProvider: React.FC<DarkModeContextProviderProps> = ({
	children
}) => {
	const [darkMode, setDarkMode] = useState<boolean>(() => {
		const storedValue = localStorage.getItem('darkMode')
		return storedValue ? JSON.parse(storedValue) : false
	})

	const toggle = () => {
		setDarkMode(!darkMode)
	}

	useEffect(() => {
		localStorage.setItem('darkMode', JSON.stringify(darkMode))
	}, [darkMode])

	return (
		<ThemeContext.Provider value={{ darkMode, toggle }}>
			{children}
		</ThemeContext.Provider>
	)
}
