import { Crypto } from '@peculiar/webcrypto';
import { useAtom } from 'jotai';
import { divAtom, genderAtom, ScheduleAtom, schoolAtom, SchoolDataAtom, seniorityAtom } from 'pages/main';
import { FC, useState } from 'react';

import { Game } from '@ts/matchUp';

type PropType = {
	month: number;
	setOpen: (data: Game[]) => void;
};

export const getDaysInMonth = (yearArg: number, monthArg: number) => new Date(yearArg, monthArg, 0).getDate();

const crypto = new Crypto();

export const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const Calendar: FC<PropType> = ({ month, setOpen }) => {
	const [gameData] = useAtom(ScheduleAtom);
	const [schoolData] = useAtom(SchoolDataAtom);
	const seniority: string[] = useAtom(seniorityAtom)[0].map(elm => elm.toLowerCase());
	const [school] = useAtom(schoolAtom);
	const div: number[] = useAtom(divAtom)[0].map(elm => Number(elm.slice(-1)));
	const gender: string[] = useAtom(genderAtom)[0].map(elm => elm.toLowerCase());

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

	const [currentDateInfo, setCurrentDateInfo] = useState<Game[]>([]);

	const handleMouseEnter = (dateInfo: Game[]) => {
		setCurrentDateInfo(dateInfo);
	};

	return (
		<div className="my-border my-shadow relative m-auto aspect-square h-fit w-full rounded-lg bg-main p-2 duration-150 ease-in-out hover:bg-main-light">
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
							<div key={crypto.randomUUID()} className="h-11/12 relative aspect-square w-11/12 cursor-pointer text-gray-700 hover:rounded-full hover:bg-blue-500 hover:text-invert">
								<p className="absolute inset-0 m-auto h-fit w-fit">{day}</p>
							</div>
						);
					}
					const currentDate = new Date(2023, month, day);

					const filteredData = gameData.filter(elm => {
						const genderBool = gender.length === 0 ? true : gender.includes(elm.homeTeam.teamType.substring(2).toLowerCase());
						const divBool = div.length === 0 ? true : div.includes(elm.homeTeam.skillDivision);
						const seniorityBool = seniority.length === 0 ? true : seniority.includes(elm.homeTeam.teamType.substring(0, 2));
						const schoolBool = school.length === 0 ? true : school.includes(elm.homeTeam.schoolName) || school.includes(elm.awayTeam.schoolName);

						if (gender.length === 0 && div.length === 0 && seniority.length === 0 && school.length === 0) {
							return true;
						}

						return genderBool && divBool && seniorityBool && schoolBool;
					});

					const gameDays = filteredData.map(elm => elm.date);

					const currentData: Date[] = gameDays.filter(elm => elm.toISOString().split('T')[0] === currentDate.toISOString().split('T')[0]);

					if (currentData.length !== 0) {
						const teamsData = filteredData.filter(elm => currentData.includes(elm.date));
						// days with events
						return (
							<button onClick={() => setOpen(currentDateInfo)} onMouseEnter={() => handleMouseEnter(teamsData)} type="button" key={crypto.randomUUID()} className="h-11/12 my-border group relative aspect-square w-11/12 cursor-pointer rounded-full bg-accent hover:scale-110 active:scale-95">
								<p className="absolute inset-0 m-auto h-fit w-fit font-bold text-stark">{day}</p>
								<div className="my-border my-shadow absolute left-1/2 top-[-.5rem] hidden h-fit w-fit translate-x-[-50%] translate-y-[-100%] flex-col rounded-md bg-main group-hover:block">
									{currentDateInfo.map(elm => (
										<div className="my-border m-1 flex justify-center gap-2 rounded-md p-1">
											<p className="text-blue-500">{schoolData.filter(elm2 => elm2.school_name === elm.homeTeam.schoolName)[0].code}</p>
											<p className="font-bold text-invert">VS</p>
											<p className="text-red-500">{schoolData.filter(elm2 => elm2.school_name === elm.awayTeam.schoolName)[0].code}</p>
										</div>
									))}
								</div>
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
		</div>
	);
};

export default Calendar;
