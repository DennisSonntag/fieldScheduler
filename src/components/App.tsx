import { createContext, useState } from 'react';

import sun from '@svg/sun.svg';
import moon from '@svg/moon.svg';
import Bg from './Bg';

export const Theme = createContext(false);

const App = ({ children }: any) => {
	const [theme, setTheme] = useState(false);
	const toggleTheme = () => {
		setTheme(prev => !prev);
	};
	return (
		<Theme.Provider value={theme}>
			<Bg theme={theme}>
				<button type="button" onClick={toggleTheme} className={`w-8 h-8 absolute top-4 left-4 hover:scale-110 active:scale-90 smooth ${theme ? 'invert' : ''}`}>
					<img src={theme ? sun : moon} alt="" srcSet="" />
				</button>
				{children}
			</Bg>
		</Theme.Provider>
	);
};
export default App;
