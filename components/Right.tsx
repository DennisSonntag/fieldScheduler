import DatePicker from './DatePicker';
import Title from './Title';

const Right = ({ rightOpen }: any) => (
	<section className={` ${rightOpen ? 'w-1/2' : 'w-0 translate-x-[100%]'} hover-fade relative flex h-full  flex-col  overflow-hidden rounded-bl-xl`}>
		<div className="h-16 w-full p-3 ">
			<Title text="Add/Edit Events" />
		</div>

		<div className="relative flex  w-full flex-grow flex-col  items-center gap-2">
			<h1 className="text-md rounded-md bg-base py-2 px-8 text-center font-bold text-stark shadow-xl">Season Start/End</h1>
			<DatePicker />
			<DatePicker />

			<div className="h-10" />

			<h1 className="text-md rounded-md bg-base py-2 px-8 text-center font-bold text-stark shadow-xl">Breaks/Holidays</h1>
			<DatePicker />
		</div>
	</section>
);
export default Right;
