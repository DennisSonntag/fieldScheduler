import { Schedule } from '@ts/matchUp';
import { useAtom } from 'jotai';
import { ScheduleAtom } from 'pages/main';
import { FC, useState } from 'react';

type PropType = {
	month: number;
	hover?: boolean;
	scale?: string;
};

export const getDaysInMonth = (yearArg: number, monthArg: number) => new Date(yearArg, monthArg, 0).getDate();

export const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const Calendar: FC<PropType> = ({ month, hover = false, scale = '' }) => {
	const gameData: Schedule[] = useAtom(ScheduleAtom)[0];

	const year = 2023;
	const date = new Date(year, month);

	const firstDayIndex = date.getDay() - 1;

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

	for (let i = 1; i <= daysInMonth; i++) {
		const nextDate = new Date(year, month, i);
		if (nextDate.getDay() === 0 || nextDate.getDay() === 6) {
			currentWeekEnds.push(i);
		}
	}

	const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

	const [dateHover, setDateHover] = useState(false);
	const [currentDateInfo, setCurrentDateInfo] = useState<any[]>([]);

	const handleMouseEnter = (currentDate: Schedule[]) => {
		setDateHover(true);
		setCurrentDateInfo(currentDate);
	};

	return (
		<div onMouseLeave={() => setDateHover(false)} className={` my-border my-shadow aspect-square h-fit w-full rounded-lg bg-main p-2 ${hover ? 'hover:scale-110' : null} ${scale || null} relative m-auto duration-150 ease-in-out`}>
			<h1 className="inset-0 mx-auto my-2 h-fit w-fit text-center text-2xl font-bold text-invert">{monthNames[month]}</h1>
			<div className="grid-rows-7 text-md grid h-full grid-cols-7 text-center">
				{weekDays.map(day => (
					<div key={crypto.randomUUID()} className="h-full w-full text-center font-bold text-invert">
						{day}
					</div>
				))}

				{firstDays.map(() => (
					<div key={crypto.randomUUID()} className=" relative h-full w-full cursor-pointer">
						<p className="absolute inset-0 m-auto h-fit w-fit"> </p>
					</div>
				))}

				{days.map(day => {
					if (currentWeekEnds.includes(day)) {
						// weekends
						return (
							<div key={crypto.randomUUID()} className="text-dim relative h-full w-full cursor-pointer">
								<p className="absolute inset-0 m-auto h-fit w-fit">{day}</p>
							</div>
						);
					}
					const currentDate = new Date(2023, month, day);

					const gameDays = gameData.map(elm => elm.date);

					const currentData: Date[] = gameDays.filter(elm => elm.toISOString().split('T')[0] === currentDate.toISOString().split('T')[0]);

					if (currentData.length !== 0) {
						const teamsData = gameData.filter(elm => currentData.includes(elm.date));
						// days with events
						return (
							<button onMouseEnter={() => handleMouseEnter(teamsData)} onMouseLeave={() => setDateHover(false)} type="button" key={crypto.randomUUID()} className="h-11/12 my-border relative aspect-square w-11/12 cursor-pointer rounded-full bg-accent hover:scale-110 active:scale-95">
								<p className="absolute inset-0 m-auto h-fit w-fit font-bold text-stark">{day}</p>
							</button>
						);
					}
					// normal weekdays
					return (
						<div key={crypto.randomUUID()} className="h-11/12 relative aspect-square w-11/12 cursor-pointer text-invert hover:rounded-full hover:bg-blue-500 hover:text-invert">
							<p className="absolute inset-0 m-auto h-fit w-fit">{day}</p>
						</div>
					);
				})}

				{lastDays.map(() => (
					<div key={crypto.randomUUID()} className="relative h-full w-full cursor-pointer">
						<p className="absolute inset-0 m-auto h-fit w-fit"> </p>
					</div>
				))}
			</div>
			{dateHover ? (
				<div className="my-border my-shadow absolute inset-x-0 bottom-[-100%] mx-auto h-fit w-fit flex-col gap-2 rounded-md p-2 font-bold">
					{currentDateInfo.map(elm => (
						<div className="my-border h-fit w-fit">
							<p className="relative h-fit w-fit">
								{elm.team1} vs {elm.team2}
							</p>
							{/* <p className="relative h-fit w-fit">{elm.day.toLocaleString('en-us').split(' ')[0]}</p> */}
							<p className="relative h-fit w-fit">{elm.day}</p>
						</div>
					))}
				</div>
			) : null}
		</div>
	);
};

export default Calendar;
