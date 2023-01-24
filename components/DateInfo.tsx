import { SetStateAction, useState } from 'react';
import Title from './Title';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

const DateInfo = () => {
	const [startDate, setStartDate] = useState(new Date());

	return (
		<div className="">
			<div className="h-16 w-full p-3 ">
				<Title text="Add/Edit Events" />
			</div>

			<div className="relative mt-4 flex w-full flex-grow  flex-col items-center gap-2">
				<h1 className="text-md my-shadow my-border rounded-md bg-main py-2 px-8 text-center font-bold text-invert">Season Start/End</h1>
				<div className="flex">
					<div className="flex-col text-center">
						<p>Start</p>
						<DatePicker className="my-border my-shadow rounded-md bg-accent p-2 text-center" selected={startDate} onChange={(date: SetStateAction<Date>) => setStartDate(date)} />
					</div>
					<div className="flex-col text-center">
						<p>End</p>
						<DatePicker className="my-border my-shadow rounded-md bg-accent p-2 text-center" selected={startDate} onChange={(date: SetStateAction<Date>) => setStartDate(date)} />
					</div>
				</div>
			</div>
		</div>
	);
};
export default DateInfo;
