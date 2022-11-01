import { useContext, useEffect, useState } from 'react';

import { Theme } from '@components/App';
import Rugby from './Rugby';
import Soccer from './Soccer';
import SportSelect from './SportSelect';
import Compare from './Compare';

const Main = () => {
	const [[rugbyActive, soccerActive, compareActive], setActivePage] = useState([true, false, false]);

	const setRugby = () => setActivePage([true, false, false]);

	const setSoccer = () => setActivePage([false, true, false]);

	const setCompare = () => setActivePage([false, false, true]);

	useEffect(() => {
		const rugby = localStorage.getItem('rugby') === 'true';
		const soccer = localStorage.getItem('soccer') === 'true';
		const compare = localStorage.getItem('compare') === 'true';
		if (rugby !== null && soccer !== null && compare !== null) {
			setActivePage([rugby, soccer, compare]);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem('rugby', String(rugbyActive));
		localStorage.setItem('soccer', String(soccerActive));
		localStorage.setItem('compare', String(compareActive));
	}, [rugbyActive, soccerActive, compareActive]);

	const theme = useContext(Theme);

	return (
		<>
			<a href="/">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={`absolute w-6 h-6 top-2 right-2 hover:scale-125 active:scale-90 ${theme ? 'fill-dark' : 'fill-light'}`}>
					<path d="M160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96C43 32 0 75 0 128V384c0 53 43 96 96 96h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H96c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32h64zM504.5 273.4c4.8-4.5 7.5-10.8 7.5-17.4s-2.7-12.9-7.5-17.4l-144-136c-7-6.6-17.2-8.4-26-4.6s-14.5 12.5-14.5 22v72H192c-17.7 0-32 14.3-32 32l0 64c0 17.7 14.3 32 32 32H320v72c0 9.6 5.7 18.2 14.5 22s19 2 26-4.6l144-136z" />
				</svg>
			</a>
			<nav className="box-border absolute inset-x-0 top-0 z-50 m-2 flex mx-auto w-fit h-fit gap-2">
				<SportSelect sport="Rugby" state={rugbyActive} click={setRugby} />
				<SportSelect sport="Soccer" state={soccerActive} click={setSoccer} />
				<button onClick={setCompare} type="button" className={`${compareActive ? `${theme ? 'bg-dark' : 'bg-light'}` : 'bg-mid'} w-10 h-10 smooth hover:scale-110 active:scale-90 outline-none select-none rounded-full border-[0.3rem] duration-100 ease-in-out ${theme ? 'border-topLight' : 'border-topDark'} absolute inset-x-0 mx-auto top-4`}>
					<svg className={`w-4 h-4 inset-0 m-auto ${compareActive ? `${theme ? 'fill-white' : 'fill-black'}` : 'fill-light'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
						<path d="M422.6 278.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L434.7 176H64c-17.7 0-32-14.3-32-32s14.3-32 32-32H434.7L377.4 54.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l112 112c12.5 12.5 12.5 32.8 0 45.3l-112 112zm-269.3 224l-112-112c-12.5-12.5-12.5-32.8 0-45.3l112-112c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3L141.3 336H512c17.7 0 32 14.3 32 32s-14.3 32-32 32H141.3l57.4 57.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0z" />
					</svg>
				</button>
			</nav>
			{rugbyActive ? <Rugby /> : null}
			{soccerActive ? <Soccer /> : null}
			{compareActive ? <Compare /> : null}
		</>
	);
};
export default Main;
