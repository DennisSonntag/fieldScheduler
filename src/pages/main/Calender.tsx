import { v4 as uuid } from 'uuid';

const Calendar = ({ month, events, hover }: any) => {
	const year = 2022;
	const date = new Date(year, month);

	const firstDayIndex = date.getDay() - 1;

	const getDaysInMonth = (yearArg: number, monthArg: number) => new Date(yearArg, monthArg, 0).getDate();

	let lastDay = getDaysInMonth(year, month);
	const daysInMonth = getDaysInMonth(year, month + 1);

	const firstDays = [];
	lastDay -= firstDayIndex;
	for (let i = 0; i <= firstDayIndex; i++) {
		firstDays.push(lastDay);
		lastDay++;
	}

	const days = [];
	for (let i = 1; i <= daysInMonth; i++) {
		days.push(i);
	}

	const daysLeft = 42 - (firstDays.length + days.length);

	const lastDays = [];
	for (let i = 1; i <= daysLeft; i++) {
		lastDays.push(i);
	}

	const currentWeekEnds: number[] = [];
	// let nextWeekEnds: number[] = [];
	// let prevWeekEnds: number[] = [];

	const dayThing = (yearArg: number, i: number, arr: number[]) => {
		const nextDate = new Date(yearArg, month, i);
		if (nextDate.getDay() === 0 || nextDate.getDay() === 6) {
			arr.push(i);
		}
	};

	for (let i = 1; i <= daysInMonth; i++) {
		// dayThing(year + 1, i, nextWeekEnds);
		dayThing(year, i, currentWeekEnds);
		// dayThing(year - 1, i, prevWeekEnds);
	}

	const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
	let index = 0;

	return (
		<button type="button" className={` relative m-auto aspect-square w-full rounded-lg bg-neo p-2 shadow-2xl duration-150 ease-in-out ${hover ? 'hover:scale-105' : null} `}>
			<h1 className="inset-0 mx-auto my-2 h-fit w-fit text-center text-2xl font-bold text-invert">{months[month]}</h1>
			<div className="grid-rows-7 text-md grid h-full grid-cols-7 text-center">
				{weekDays.map(day => (
					<div key={uuid()} className="h-full w-full text-center font-bold text-stark">
						{day}
					</div>
				))}

				{firstDays.map(() => (
					<div key={uuid()} className=" relative h-full w-full cursor-pointer">
						<p className="absolute inset-0 m-auto h-fit w-fit"> </p>
					</div>
				))}

				{days.map(day => {
					if (currentWeekEnds.includes(day)) {
						// weekends
						return (
							<div key={uuid()} className="relative h-full w-full cursor-pointer text-dim">
								<p className="absolute inset-0 m-auto h-fit w-fit">{day}</p>
							</div>
						);
					}
					if (events[index] === day) {
						index++;
						// days with events
						return (
							<div key={uuid()} className="h-11/12 relative aspect-square w-11/12 cursor-pointer rounded-full bg-blue-600">
								<p className="absolute inset-0 m-auto h-fit w-fit font-bold text-invert ">{day}</p>
							</div>
						);
					}
					// normal weekdays
					return (
						<div key={uuid()} className="h-11/12 relative aspect-square w-11/12 cursor-pointer text-stark hover:rounded-full hover:bg-blue-800 hover:text-invert">
							<p className="absolute inset-0 m-auto h-fit w-fit">{day}</p>
						</div>
					);
				})}

				{lastDays.map(() => (
					<div key={uuid()} className="relative h-full w-full cursor-pointer">
						<p className="absolute inset-0 m-auto h-fit w-fit"> </p>
					</div>
				))}
			</div>
		</button>
	);
};

export default Calendar;
