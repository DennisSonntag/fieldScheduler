import { Theme } from '@components/App';
import { useContext } from 'react';
import { v4 as uuid } from 'uuid';

const Calendar = ({ month, events }: any) => {
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

	const theme = useContext(Theme);

	return (
		<button type="button" className={` ${theme ? 'neo-dark' : 'neo-light'} w-full aspect-square  p-2 rounded-lg shadow-2xl hover:scale-110 duration-150 ease-in-out m-auto`}>
			<h1 className="text-lg font-bold text-center text-white">{months[month]}</h1>
			<div className="grid h-full grid-cols-7 text-center grid-rows-7 text-md">
				{weekDays.map(day => (
					<div key={uuid()} className={`w-full h-full text-center ${theme ? 'text-white' : 'text-black'} `}>
						{day}
					</div>
				))}

				{firstDays.map(() => (
					<div key={uuid()} className="text-black relative w-full h-full cursor-pointer">
						<p className="absolute inset-0 m-auto w-fit h-fit"> </p>
					</div>
				))}

				{days.map(day => {
					if (currentWeekEnds.includes(day)) {
						// weekends
						return (
							<div key={uuid()} className={`text-gray-500 relative w-full h-full cursor-pointer ${theme ? 'text-black' : 'text-white'}`}>
								<p className="absolute inset-0 m-auto text-gray-500 w-fit h-fit">{day}</p>
							</div>
						);
					}
					if (events[index] === day) {
						index++;
						// days with events
						return (
							<div key={uuid()} className="relative w-11/12 rounded-full cursor-pointer h-11/12 aspect-square bg-blue">
								<p className={`absolute inset-0 m-auto font-bold ${theme ? 'text-white' : 'text-black'} w-fit h-fit `}>{day}</p>
							</div>
						);
					}
					// normal weekdays
					return (
						<div key={uuid()} className={`relative w-11/12 ${theme ? 'text-white' : 'text-black'} cursor-pointer h-11/12 aspect-square hoverDay`}>
							<p className="absolute inset-0 m-auto w-fit h-fit">{day}</p>
						</div>
					);
				})}

				{lastDays.map(() => (
					<div key={uuid()} className={`relative w-full h-full ${theme ? 'text-black' : 'text-white'} cursor-pointer`}>
						<p className="absolute inset-0 m-auto w-fit h-fit"> </p>
					</div>
				))}
			</div>
		</button>
	);
};

export default Calendar;
