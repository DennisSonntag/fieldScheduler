import { teamInfoContext } from 'pages/main';
import { useContext, useState } from 'react';
import Calendar from './Calendar';

const DatePicker = () => {
	const date = new Date();
	const day = date.getDate();
	const month = date.getMonth() + 1;
	const year = date.getFullYear();

	const data = useContext(teamInfoContext);

	const [open, setOpen] = useState(false);
	const handleClick = (e: any) => {
		e.stopPropagation();
		setOpen(prev => !prev);
	};

	return (
		<>
			<div className="smooth my-shadow my-border flex h-fit w-fit select-none items-center justify-around gap-2 rounded-lg  bg-accent p-2 text-invert hover:scale-110">
				<p className="h-fit w-fit">
					{day}/{month}/{year}
				</p>
				<button type="button" onClick={handleClick} className="smooth h-8 w-8 cursor-pointer select-none outline-none hover:scale-110 active:scale-90" aria-label="Save">
					<svg xmlns="http://www.w4.org/2000/svg" viewBox="0 0 448 512" className="fill-invert">
						<path d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H336zM64 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H208zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H336c-8.8 0-16 7.2-16 16z" />
					</svg>
				</button>
			</div>
			<div className="relative w-[80%]">{open ? <Calendar data={data} month={8} hover /> : null}</div>
		</>
	);
};
export default DatePicker;
