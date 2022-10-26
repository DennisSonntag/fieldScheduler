import { createContext, useContext, useState } from "react"

const ThemeContext = createContext(false)
const ThemeUpdateContext = createContext(()=>{})

export const useTheme = () => {
	return useContext(ThemeContext)
}

export const useThemeUpdate = () => {
	return useContext(ThemeUpdateContext)
}

export const ThemeProvider = ({ children }:any) => {

	const [darkTheme, setDarkTheme ] = useState(true)


	const toggleTheme = () => {
		setDarkTheme(prev => !prev)
	}

	return (
		<ThemeContext.Provider value={darkTheme}>
			<ThemeUpdateContext.Provider value={toggleTheme}>
				{children}
			</ThemeUpdateContext.Provider>
		</ThemeContext.Provider>
	)
}
