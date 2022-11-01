import { useState } from 'react';

import dateIcon from '@svg/date.svg';
import Calendar from './Calender';

const DatePicker = () => {
	const date = new Date();
	const dd = date.getDate();
	const mm = date.getMonth() + 1;
	const yyyy = date.getFullYear();

	const [open, setOpen] = useState(false);
	const handleClick = (e: any) => {
		e.stopPropagation();
		setOpen(prev => !prev);
	};
	return (
		<>
			<div className="text-white flex justify-around items-center rounded-lg shadow-xl hover:scale-110 smooth select-none gap-2 p-2 bg-mid w-fit h-fit">
				<p className="w-fit h-fit">
					{dd}/{mm}/{yyyy}
				</p>
				<button type="button" onClick={handleClick} className="w-8 h-8 active:scale-90 hover:scale-110 smooth cursor-pointer outline-none select-none" aria-label="Save">
					<img src={dateIcon} alt="" className="outline-none select-none" />
				</button>
			</div>
			<div className="w-[80%] relative">{open ? <Calendar events={[]} month={9} /> : null}</div>
		</>
	);
};
export default DatePicker;
