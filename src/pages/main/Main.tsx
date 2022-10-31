import { useContext, useState } from 'react';

import { Theme } from '@components/App';
import compare from '@svg/compare.svg';
import Rugby from './Rugby';
import Soccer from './Soccer';
import SportSelect from './SportSelect';
import Compare from './Compare';

const Main = () => {
	// 0 == hidden
	// 1 == shown 
	// 2 == compare
	const [rugbyActive, setRugbyActive] = useState(1);
	const [soccerActive, setSoccerActive] = useState(0);
	const [compareActive, setCompareActive] = useState(0);

	const setRugby = () => {
		setRugbyActive(1);
		setSoccerActive(0);
		setCompareActive(0)
	};

	const setSoccer = () => {
		setRugbyActive(0);
		setSoccerActive(1);
		setCompareActive(0)
	};

	const setCompare = () => {
		setRugbyActive(2);
		setSoccerActive(2);
		setCompareActive(2)
	};

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
				<button onClick={setCompare} type="button" className={`${compareActive == 2 ?  `${theme ? 'bg-dark' : 'bg-light'}` : 'bg-mid'} w-10 h-10 smooth hover:scale-110 active:scale-90 outline-none select-none rounded-full border-[0.3rem] duration-100 ease-in-out ${theme ? 'border-topLight' : 'border-topDark'} absolute inset-x-0 mx-auto top-4`}>
					<img className="w-4 h-4 inset-0 m-auto " src={compare} alt="" srcSet="" />
				</button>
			</nav>
			{rugbyActive == 0 ? <Soccer /> : null}
			{rugbyActive == 1 ? <Rugby /> : null}
			{rugbyActive == 2? <Compare /> : null}
		</>
	);
};
export default Main;
