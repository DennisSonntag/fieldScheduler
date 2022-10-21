import { useState } from "react";
import { v4 as uuid } from "uuid";

const Calendar = (props: any) => {
	const year = 2022;
	const month = props.month;
	const date = new Date(year, month);

	const firstDayIndex = date.getDay() - 1;

	const getDaysInMonth = (year: number, month: number) => {
		return new Date(year, month, 0).getDate();
	};

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

	let currentWeekEnds: number[] = [];
	// let nextWeekEnds: number[] = [];
	// let prevWeekEnds: number[] = [];

	const dayThing = (year: number, i: number, arr: number[]) => {
		let nextDate = new Date(year, month, i);
		nextDate.getDay() == 0 || nextDate.getDay() == 6 ? arr.push(i) : null;
	};

	for (let i = 1; i <= daysInMonth; i++) {
		// dayThing(year + 1, i, nextWeekEnds);
		dayThing(year, i, currentWeekEnds);
		// dayThing(year - 1, i, prevWeekEnds);
	}

	const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	const weekDays = ["S", "M", "T", "W", "T", "F", "S"];
	let index = 0;

	const [active, setActive] = useState(false);


	const handleClick = () => {
		setActive(prev => !prev)
	}

	return (
		<main onClick={handleClick} className={`${active  ?"bg-red": "neo-800"} w-full aspect-square  p-2 rounded-lg shadow-2xl hover:scale-110 duration-150 ease-in-out m-auto`}>
			<h1 className="text-center text-lg font-bold text-white">{months[month]}</h1>
			<div className="grid grid-cols-7 grid-rows-7 text-center text-md h-full">
				{weekDays.map(day => (
					<div key={uuid()} className="w-full h-full text-center text-white">
						{day}
					</div>
				))}

				{firstDays.map(day => (
					<div key={uuid()} className={"text-black relative w-full h-full cursor-pointer"}>
						<p className=" absolute m-auto w-fit h-fit inset-0 "></p>
					</div>
				))}

				{days.map(day => {
					if (currentWeekEnds.includes(day)) {
						// weekends
						return (
							<div key={uuid()} className={"text-gray-500 relative w-full h-full cursor-pointer"}>
								<p className=" absolute m-auto w-fit h-fit inset-0 text-gray-500 ">{day}</p>
							</div>
						);
					}
					if (props.events[index] == day) {
						index++;
						// days with events
						return (
							<div key={uuid()} className="relative w-11/12 h-11/12 aspect-square bg-blue rounded-full cursor-pointer">
								<p className="absolute inset-0 m-auto text-white w-fit h-fit font-bold ">{day}</p>
							</div>
						);
					} else {
						// normal weekdays
						return (
							<div key={uuid()} className="text-white relative w-11/12 h-11/12 aspect-square cursor-pointer hoverDay">
								<p className=" absolute m-auto w-fit h-fit inset-0 ">{day}</p>
							</div>
						);
					}
				})}

				{lastDays.map(day => (
					<div key={uuid()} className="text-black relative w-full h-full cursor-pointer">
						<p className=" absolute m-auto w-fit h-fit inset-0 "></p>
					</div>
				))}
			</div>
		</main>
	);
};

export default Calendar;
