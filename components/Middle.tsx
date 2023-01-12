import { FC, useState } from 'react';

import caret from '@svg/caret.svg';

import Image from 'next/image';

import Calendar, { getDaysInMonth, monthNames } from './Calendar';
import Title from './Title';
import Download from './Download';
import ViewBtn from './ViewBtn';
import WeekCaret from './WeekCaret';

type PropType = {
	title: string;
};

const Middle: FC<PropType> = ({ title }) => {
	const months = [2, 3, 4, 5];

	const [active, setActive] = useState(0);

	const setNext = () => {
		if (active === 2) {
			setActive(0);
			return;
		}
		setActive(prev => (prev += 1));
	};

	const setPrev = (e: { preventDefault: () => void }) => {
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

	const incWeek = () => {
		if (week + 1 <= 18) {
			setWeek(prev => (prev += 1));
			// console.log(Number(String(monthTable[week + 1])[0]));
		}
	};

	const decWeek = () => {
		if (week - 1 >= 1) {
			setWeek(prev => (prev -= 1));
			// setMonth(Math.floor(week / 4) + 2);
			// console.log(Number(String(monthTable[week + 1])[0]));
		}
	};

	const incMonth = () => {
		if (month + 1 <= 5) {
			setMonth(prev => (prev += 1));
		}
	};

	const decMonth = () => {
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

	return (
		<section className="hover-fade relative flex h-full w-full flex-col overflow-hidden">
			<section className="h-16 w-full p-3">
				<Title text={title} />
			</section>
			<div className="relative h-12 w-full shrink-0 p-2">
				<ViewBtn setNextState={setNext} setPrevState={setPrev} iconNum={active} />
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
						<button type="button" onClick={decMonth}>
							<Image src={caret} alt="" className="smooth inv h-16 w-16 rotate-90 hover:scale-110 active:scale-95" />
						</button>
						<Calendar month={month} scale="scale-[100%]" />
						<button type="button" onClick={incMonth}>
							<Image src={caret} alt="" className="smooth inv h-16 w-16 rotate-[270deg] hover:scale-110 active:scale-95" />
						</button>
					</div>
				) : null}
				{active === 2 ? (
					<div className="absolute inset-0 m-auto flex h-32 w-full">
						<h1 className="absolute inset-x-0 top-[-8rem] mx-auto h-fit w-fit text-[2rem] font-bold text-invert">{monthNames[month]}</h1>
						<h1 className="absolute inset-x-0 top-[-5rem] mx-auto h-fit w-fit text-[2rem] font-bold text-invert">Week {week}</h1>
						<WeekCaret func={incWeek} top />
						<div className="m-2 flex h-full w-full gap-4">
							{weekData.map((day, index) => (
								<div className="my-border bg-base my-shadow relative h-full w-full rounded-md">
									<p className="absolute inset-x-0 mx-auto h-fit w-fit px-2 font-bold">{weekDays[index]}</p>
									<div>{day}</div>
								</div>
							))}
						</div>
						<WeekCaret func={decWeek} />
					</div>
				) : null}
				{active === 3 ? <div className="absolute inset-0 m-auto h-fit w-fit text-2xl font-bold text-bug">Day tbd ...</div> : null}
			</section>

			<div className="grid h-[20%] w-full place-content-center ">
				<Download />
			</div>
		</section>
	);
};
export default Middle;
