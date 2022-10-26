import { createContext, useState } from "react";
import Bg from "./Bg";
import sun from "@svg/sun.svg"
import moon from "@svg/moon.svg"
import { ThemeProvider, useTheme, useThemeUpdate } from "./ThemeProvider";


const App = ({children}:any) =>  {
	const darkTheme = useTheme()
	const toggleTheme = useThemeUpdate()

	return (
		<ThemeProvider>
			<Bg>
				{
					darkTheme
					?<img onClick={toggleTheme} className="w-8 h-8 absolute top-2 left-2 hover:scale-110 active:scale-90 smooth invert" src={sun} alt="" srcSet="" />
					:<img onClick={toggleTheme} className="w-8 h-8 absolute top-2 left-2 hover:scale-110 active:scale-90 smooth" src={moon} alt="" srcSet="" />
				}
				{children}
			</Bg>
		</ThemeProvider>
	);
}

export default App