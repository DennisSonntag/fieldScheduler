import { Theme } from '@components/App';
import { useContext } from 'react';
import DatePicker from './DatePicker';
import Title from './Title';

const Right = ({ rightOpen }: any) => {
	const theme = useContext(Theme);
	return (
		<section className={` ${rightOpen ? 'w-1/2 ' : 'w-0 translate-x-full'} gap-2 h-full relative items-center flex flex-col hover-fade overflow-hidden duration-200 ease-in-out`}>
			<div className="w-full h-16 p-3 ">
				<Title text="Add/Edit Events" />
			</div>

			<div className="relative gap-2  flex-grow flex flex-col  items-center w-full">
				<h1 className={`text-center py-2 px-8 rounded-md shadow-xl ${theme ? 'bg-dark text-white' : 'bg-light text-black'} font-bold text-md`}>Season Start/End</h1>
				<DatePicker />
				<DatePicker />

				<div className="h-10" />

				<h1 className={`text-center py-2 px-8 rounded-md shadow-xl ${theme ? 'bg-dark text-white' : 'bg-light text-black'} font-bold text-md`}>Breaks/Holidays</h1>
				<DatePicker />
			</div>
		</section>
	);
};
export default Right;
