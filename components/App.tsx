import { useTheme } from 'next-themes';
import Head from 'next/head';
import Image from 'next/image';
import { FC, ReactNode, useEffect, useState } from 'react';

import moon from '@svg/moon.svg';
import sun from '@svg/sun.svg';

import Button from './Button';

type PropType = {
	children: ReactNode;
	title: string;
};

const App: FC<PropType> = ({ children, title }) => {
	const { theme, setTheme } = useTheme();
	const [themeBool, setThemeBool] = useState<boolean>(theme === 'dark');

	useEffect(() => {
		setThemeBool(theme === 'dark');
	}, [theme]);

	const toggleTheme = () => {
		const nextTheme = theme === 'dark' ? 'light' : 'dark';
		setTheme(nextTheme);
	};

	return (
		<>
			<Head>
				<meta name="viewport" content="width=device-width" />
				<link rel="icon" type="image/svg+xml" href="../public/icon.svg" />
				<title> {title} </title>
			</Head>
			<div className={`smooth-bg absolute m-0 box-border h-screen w-screen bg-back  ${themeBool ? 'light' : 'dark'} `}>
				<Button className="absolute top-2 left-2 h-fit w-fit p-1" title={`Change to ${themeBool ? 'dark' : 'light'} mode`} onClick={toggleTheme}>
					<Image src={themeBool ? moon : sun} alt="Dark/Light mode toggle button" className={`m-2 h-6 w-6 ${!themeBool ? 'invert' : null}`} />
				</Button>
				{children}
			</div>
			;
		</>
	);
};
export default App;
