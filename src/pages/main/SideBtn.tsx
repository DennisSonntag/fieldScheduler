import { useContext } from 'react';

import { Theme } from '@components/App';
import arrow from '@svg/arrow.svg';

const SideBtn = ({ side, state, setState }: any) => {
	const theme = useContext(Theme);
	const bg = theme ? 'bg-dark' : 'bg-light';
	const inv = theme ? 'invert' : '';

	return (
		<section className="grid w-12 pt-4 hover-fade place-content-center shrink-0 group ">
			<button type="button" onClick={() => setState((prev: boolean) => !prev)} className={state ? `rotate-${side ? '180' : '0'} p-2 w-8 h-8 ${bg} rounded-md shadow-lg hover:scale-110 active:scale-95 duration-100 ease-in-out` : `group-hover:translate-x-0 translate-x-[${side ? '' : '-'}200%] rotate-${side ? '0' : '180'} p-2 w-8 h-8 ${bg} rounded-md shadow-lg hover:scale-110 active:scale-95 duration-100 ease-in-out`}>
				<img className={`${inv} w-4 h-4 inset-0 m-auto  absolute`} src={arrow} alt="side pane open button" />
			</button>
		</section>
	);
};
export default SideBtn;
