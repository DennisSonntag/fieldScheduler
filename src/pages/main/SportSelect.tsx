import { Theme } from '@components/App';
import { useContext } from 'react';

const SportSelect = ({ state, click, sport }: any) => {
	// } hover:w-[20rem] origin-center active:w-[15rem] duration-150 ease-in-out
	const theme = useContext(Theme);
	return (
		<button type="button" onClick={click} className={`${state ? `${theme ? 'bg-dark' : 'bg-light'}` : 'bg-mid'} w-[16rem] h-[2.5rem] rounded-md relative ${sport === 'Rugby' ? 'rounded-bl-[1.5rem] shadow-2xl origin-top-right ' : 'shadow-2xl rounded-br-[1.5rem] origin-top-left'} hover:scale-105  active:scale-95 duration-150 ease-in-out select-none`}>
			<h1 className={`${state ? `${theme ? 'text-white' : 'text-black'}` : 'text-light'} inline-block text-lg font-bold w-fit h-fit absolute inset-0 m-auto`}>{sport}</h1>
		</button>
	);
};
export default SportSelect;
