import DatePicker from './DatePicker';
import Title from './Title';

const DateInfo = () => (
	<div className="">
		<div className="h-16 w-full p-3 ">
			<Title text="Add/Edit Events" />
		</div>

		<div className="relative mt-4 flex w-full flex-grow  flex-col items-center gap-2">
			<h1 className="text-md my-shadow my-border rounded-md bg-main py-2 px-8 text-center font-bold text-invert">Season Start/End</h1>
			<DatePicker />
			<DatePicker />

			<div className="h-10" />

			<h1 className="text-md my-shadow my-border rounded-md bg-main py-2 px-8 text-center font-bold text-invert">Breaks/Holidays</h1>
			<DatePicker />
		</div>
	</div>
);
export default DateInfo;
