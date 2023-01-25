import { FC, ReactNode, useEffect, useState } from 'react';

import sun from '@svg/sun.svg';
import moon from '@svg/moon.svg';
import Head from 'next/head';
import Image from 'next/image';

type PropType = {
	children: ReactNode;
	title: string;
};

const App: FC<PropType> = ({ children, title }) => {
	const [theme, setTheme] = useState(false);
	useEffect(() => {
		setTheme(JSON.parse(localStorage.getItem('dark') as string));
	}, []);
	const toggleTheme = () => {
		setTheme(prev => !prev);
	};

	useEffect(() => {
		localStorage.setItem('dark', JSON.stringify(theme));
	}, [theme]);

	return (
		<>
			<Head>
				<meta name="viewport" content="width=device-width" />
				<link rel="icon" type="image/svg+xml" href="../public/icon.svg" />
				<title> {title} </title>
			</Head>
			<div className={`smooth-bg absolute m-0 box-border h-screen w-screen bg-back  ${theme ? 'light' : 'dark'} `}>
				<button title={`Change to ${theme ? 'dark' : 'light'} mode`} type="button" onClick={toggleTheme} className="smooth-scale my-border my-shadow absolute top-2 left-2 h-fit w-fit rounded-md bg-accent hover:scale-110 active:scale-90">
					<Image src={theme ? sun : moon} alt="Dark/Light mode toggle button" className={`m-2 h-6 w-6 ${theme ? 'invert' : null}`} />
				</button>
				{children}
			</div>
			;
		</>
	);
};
export default App;
