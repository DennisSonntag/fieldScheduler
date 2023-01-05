import DatePicker from './DatePicker';
import Title from './Title';

const DateInfo = () => (
	<div className="">
		<div className="h-16 w-full p-3 ">
			<Title text="Add/Edit Events" />
		</div>

		<div className="relative flex w-full flex-grow flex-col  items-center gap-2 mt-4">
			<h1 className="text-md rounded-md bg-main py-2 px-8 text-center font-bold text-invert my-shadow my-border">Season Start/End</h1>
			<DatePicker />
			<DatePicker />

			<div className="h-10" />

			<h1 className="text-md rounded-md bg-main py-2 px-8 text-center font-bold text-invert my-shadow my-border">Breaks/Holidays</h1>
			<DatePicker />
		</div>
	</div>
);
export default DateInfo;
