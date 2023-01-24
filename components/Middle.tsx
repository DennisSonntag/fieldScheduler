import { FC, useState } from 'react';

import caret from '@svg/caret.svg';

import Image from 'next/image';

import generateSchedule, { Team } from '@ts/matchUp';
import { ScheduleAtom, TeamInfoAtom } from 'pages/main';
import { useAtom } from 'jotai';
import Calendar, { getDaysInMonth, monthNames } from './Calendar';
import Title from './Title';
import Download from './Download';
import ViewBtn from './ViewBtn';
import WeekCaret from './WeekCaret';

type PropType = {
	title: string;
};

const Middle: FC<PropType> = ({ title }) => {
	const setGameData = useAtom(ScheduleAtom)[1];
	const [teamData] = useAtom(TeamInfoAtom);
	const months = [2, 3, 4, 5];

	const [active, setActive] = useState(0);

	const setNextView = () => {
		if (active === 2) {
			setActive(0);
			return;
		}
		setActive(prev => (prev += 1));
	};

	const setPrevious = (e: { preventDefault: () => void }) => {
		e.preventDefault();
		if (active === 0) {
			setActive(3);
			return;
		}
		setActive(prev => (prev -= 1));
	};

	const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
	const [week, setWeek] = useState(1);
	const [month, setMonth] = useState(2);
	// const monthTable = [2, 2, 2, 2, 23, 3, 3, 3, 3, 4, 4, 4, 4, 45];

	const incrementWeek = () => {
		if (week + 1 <= 18) {
			setWeek(prev => (prev += 1));
		}
	};

	const decrementWeek = () => {
		if (week - 1 >= 1) {
			setWeek(prev => (prev -= 1));
		}
	};

	const incrementMonth = () => {
		if (month + 1 <= 5) {
			setMonth(prev => (prev += 1));
		}
	};

	const decrementMonth = () => {
		if (month - 1 >= 2) {
			setMonth(prev => (prev -= 1));
		}
	};

	const days: number[] = [];
	for (let i = 0; i < 6; i++) {
		for (let j = 1; j <= getDaysInMonth(2022, 2 + i); j++) {
			days.push(j);
		}
	}

	const getWeek = (weekNum: number): number[] => {
		const result: number[] = [];
		for (let i = 0; i < 7; i++) {
			result[i] = days[26 + (i + 7 * weekNum)];
		}
		return result;
	};

	const weekData = getWeek(week - 1);

	const handleClickCalculate = async () => {
		// console.log(teamData);
		const TeamTypes = ['srBoys', 'jrBoys', 'srGirls', 'jrGirls'];
		const FieldNames = ['none', 'single', 'double'];
		const AltFieldNames = ['cru', 'irish'];

		const teams: Team[] = teamData.map((elm, index) => ({
			schoolName: elm.school as string,
			teamType: TeamTypes[elm.type - 1],
			skillDivision: elm.div,
			field: FieldNames[Math.floor((index * 3) / teamData.length)],
			// field: 'single',
			alternateFields: AltFieldNames[Math.floor((index * 2) / teamData.length)],
			gamesPlayed: 0,
			opponents: [],
		}));
		const unavailableDates: Date[] = [
			/* array of dates */
		];
		// Number of referees
		const maxGamesPerDay: number = 10;
		const startDate = new Date(2023, 2, 1);
		const endDate = new Date(2023, 5, 30);

		const result = generateSchedule(teams, maxGamesPerDay, unavailableDates, startDate, endDate);

		// console.log(result.map(elm => elm.homeTeam.gamesPlayed).filter(elm => elm !== 6));
		// console.log(result.map(elm => elm.awayTeam.gamesPlayed).filter(elm => elm !== 6));
		// console.log(result);

		setGameData(result);
	};

	return (
		<section className="hover-fade relative flex h-full w-full flex-col overflow-hidden">
			<section className="h-16 w-full p-3">
				<Title text={title} />
			</section>
			<div className="relative h-12 w-full shrink-0 p-2">
				<ViewBtn setNextState={setNextView} setPrevState={setPrevious} iconNum={active} />
			</div>

			<section className="my-col-2 relative grid  h-auto w-full grow auto-rows-auto gap-4 p-8 duration-300 ease-in-out ">
				{active === 0 ? (
					<>
						{months.map(monthParam => (
							<Calendar key={monthParam} month={monthParam} hover />
						))}
					</>
				) : null}
				{active === 1 ? (
					<div className="absolute inset-0 m-auto flex h-fit w-[30rem] ">
						<button type="button" onClick={decrementMonth}>
							<Image src={caret} alt="" className="smooth inv h-16 w-16 rotate-90 hover:scale-110 active:scale-95" />
						</button>
						<Calendar month={month} scale="scale-[100%]" />
						<button type="button" onClick={incrementMonth}>
							<Image src={caret} alt="" className="smooth inv h-16 w-16 rotate-[270deg] hover:scale-110 active:scale-95" />
						</button>
					</div>
				) : null}
				{active === 2 ? (
					<div className="absolute inset-0 m-auto flex h-32 w-full">
						<h1 className="absolute inset-x-0 top-[-8rem] mx-auto h-fit w-fit text-[2rem] font-bold text-invert">{monthNames[month]}</h1>
						<h1 className="absolute inset-x-0 top-[-5rem] mx-auto h-fit w-fit text-[2rem] font-bold text-invert">Week {week}</h1>
						<WeekCaret func={incrementWeek} top />
						<div className="m-2 flex h-full w-full gap-4">
							{weekData.map((day, index) => (
								<div className="my-border bg-base my-shadow relative h-full w-full rounded-md">
									<p className="absolute inset-x-0 mx-auto h-fit w-fit px-2 font-bold">{weekDays[index]}</p>
									<div>{day}</div>
								</div>
							))}
						</div>
						<WeekCaret func={decrementWeek} />
					</div>
				) : null}
				{active === 3 ? <div className="absolute inset-0 m-auto h-fit w-fit text-2xl font-bold text-bug">Day tbd ...</div> : null}
			</section>

			<div className="inset-x-0 mx-auto h-fit w-fit flex-col items-center">
				<button title="Edit Team Data" onClick={handleClickCalculate} type="button" className="my-shadow my-border smooth-scale relative inset-x-0 mx-auto h-fit w-fit rounded-md bg-main p-3 font-bold text-invert hover:scale-110 active:scale-90">
					Calculate Schedule
				</button>
				<div className="grid place-content-center ">
					<Download />
				</div>
			</div>
		</section>
	);
};
export default Middle;
