import { ReactNode, useEffect, useState } from 'react';

import sun from '@svg/sun.svg';
import moon from '@svg/moon.svg';
import Bg from './Bg';

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
		<Bg theme={theme}>
			<button title={`Change to ${theme ? 'dark' : 'light'} mode`} type="button" onClick={toggleTheme} className={`smooth absolute top-2 left-2 h-6 w-6 hover:scale-110 active:scale-90 ${theme ? 'invert' : ''}`}>
				<img src={theme ? sun : moon} alt="Dark/Light mode toggle button" />
			</button>
			{children}
		</Bg>
	);
};
export default App;
