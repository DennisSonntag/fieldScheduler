import { createContext, ReactNode, useEffect, useState } from 'react';

import sun from '@svg/sun.svg';
import moon from '@svg/moon.svg';
import Bg from './Bg';

export const Theme = createContext(false);

type PropType = {
	children: ReactNode;
};

const App = ({ children }: PropType) => {
	const [theme, setTheme] = useState(false);
	const toggleTheme = () => {
		setTheme(prev => !prev);
	};
	useEffect(() => {
		setTheme(JSON.parse(localStorage.getItem('dark') as string));
	}, []);

	useEffect(() => {
		localStorage.setItem('dark', JSON.stringify(theme));
	}, [theme]);

	return (
		<Theme.Provider value={theme}>
			<Bg theme={theme}>
				<button title={`Change to ${theme ? 'dark' : 'light'} mode`} type="button" onClick={toggleTheme} className={`w-8 h-8 absolute top-4 left-4 hover:scale-110 active:scale-90 smooth ${theme ? 'invert' : ''}`}>
					<img src={theme ? sun : moon} alt="Dark/Light mode toggle button" />
				</button>
				{children}
			</Bg>
		</Theme.Provider>
	);
};
export default App;
