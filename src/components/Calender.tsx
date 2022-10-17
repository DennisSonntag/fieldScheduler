import { uuid } from "uuidv4";

const Calendar = (props: any) => {
	const year = 2022;
	const month = props.month;
	const date = new Date(year, month);

	let lastDay = new Date(year, month + 1, 0).getDate() - 1;

	const daysInMonth = new Date(year, month + 1, 0).getDate();

	const firstDayIndex = date.getDay() - 1;

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

	const events = props.events;

	let currentWeekEnds: number[] = [];
	let nextWeekEnds: number[] = [];
	let prevWeekEnds: number[] = [];

	for (let i = 1; i <= daysInMonth; i++) {
		//looping through days in month
		let newDate = new Date(year, month, i);
		if (newDate.getDay() == 0 || newDate.getDay() == 6) {
			//if Sunday
			currentWeekEnds.push(i);
		}
	}
	for (let i = 1; i <= daysInMonth; i++) {
		//looping through days in month
		let newDate = new Date(year + 1, month, i);
		if (newDate.getDay() == 0 || newDate.getDay() == 6) {
			//if Sunday
			nextWeekEnds.push(i);
		}
	}
	for (let i = 1; i <= daysInMonth; i++) {
		//looping through days in month
		let newDate = new Date(year, month - 1, i);
		if (newDate.getDay() == 0 || newDate.getDay() == 6) {
			//if Sunday
			prevWeekEnds.push(i);
		}
	}

	const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	const weekDays = ["S", "M", "T", "W", "T", "F", "S"];
	let index = 0;
	return (
		<>
			<main className="bg-gray-800 w-fit h-fit p-2 rounded-lg shadow-2xl">
				<h1 className="text-center text-lg font-bold text-white">{months[month]}</h1>

				<div className="grid grid-cols-7 grid-rows-7 text-center text-xs">
					{weekDays.map(day => (
						<div key={uuid()} className="w-8 h-8 text-center text-white">
							{day}
						</div>
					))}
					{firstDays.map(day => (
						<div key={uuid()}> </div>
					))}

					{days.map(day => {
						if (currentWeekEnds.includes(day)) {
							return (
								<div key={uuid()} className={"text-gray-500 -500 relative w-8 h-8 cursor-pointer"}>
									<p key={uuid()} className=" absolute m-auto w-fit h-fit inset-0 text-gray-500 ">
										{day}
									</p>
								</div>
							);
						}
						if (events[index] == day) {
							index++;
							return (
								<div key={uuid()} className={"relative w-7 h-7 bg-blue-500 rounded-full cursor-pointer"}>
									<p key={uuid()} className="absolute inset-0 m-auto text-white w-fit h-fit font-bold ">
										{day}
									</p>
								</div>
							);
						} else {
							return (
								<div key={uuid()} className={"text-white relative w-8 h-8 cursor-pointer hoverDay"}>
									<p key={uuid()} className=" absolute m-auto w-fit h-fit inset-0 ">
										{day}
									</p>
								</div>
							);
						}
					})}

					{lastDays.map(day => (
						<div key={uuid()}> </div>
					))}
				</div>
			</main>
		</>
	);
};

export default Calendar;
