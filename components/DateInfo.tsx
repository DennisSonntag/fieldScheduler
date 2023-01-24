import { useState } from 'react';

import { useAtom } from 'jotai';
import { startEndDateAtom } from 'pages/main';
import Title from './Title';

const DateInfo = () => {
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());
	const setStartEndDate = useAtom(startEndDateAtom)[1];

	const changeDates = () => {
		setStartEndDate([startDate, endDate]);
	};

	return (
		<div className="">
			<div className="h-16 w-full p-3 ">
				<Title text="Add/Edit Events" />
			</div>

			<div className="relative mt-4 flex w-full flex-grow  flex-col items-center gap-2">
				<h1 className="text-md my-shadow my-border rounded-md bg-main py-2 px-8 text-center font-bold text-invert">Season Start/End</h1>
				<div className="flex gap-2">
					<div className="flex-col text-center">
						<p>Start</p>
						<input type="date" className="smooth-scale my-border my-shadow  rounded-md bg-accent p-2 text-center hover:scale-105 active:scale-95" onChange={e => setStartDate(e.target.valueAsDate)} />
					</div>
					<div className="flex-col text-center">
						<p>End</p>
						<input type="date" className="smooth-scale my-border my-shadow  rounded-md bg-accent p-2 text-center hover:scale-105 active:scale-95" onChange={e => setStartDate(e.target.valueAsDate)} />
					</div>
				</div>
				<button onClick={changeDates} type="button" className="smooth-scale my-border my-shadow rounded-md bg-accent p-2 hover:scale-110 active:scale-90">
					Confirm
				</button>
			</div>
		</div>
	);
};
export default DateInfo;
