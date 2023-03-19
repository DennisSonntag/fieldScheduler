/* eslint-disable no-await-in-loop */

/* eslint-disable no-restricted-syntax */
import { Crypto } from '@peculiar/webcrypto';
import Image from 'next/image';
import { Game } from 'pages/api/calculate';
import { SportType, possibleData } from 'pages/main';
import PocketBase from 'pocketbase';
import { FC, useRef, useState, useReducer, Reducer } from 'react';

import caret from '@svg/caret.svg';

import Button from './Button';
import Calculate from './Calculate';
import Calendar, { getDaysInMonth, monthNames } from './Calendar';
import Download from './Download';
import Title from './Title';
import ViewBtn from './ViewBtn';
import WeekCaret from './WeekCaret';

type PropType = {
	title: string;
	sportType: SportType;
};

const crypto = new Crypto();

const pb = new PocketBase('http://127.0.0.1:8090');

const Middle: FC<PropType> = ({ title, sportType }) => {
	const months = [2, 3, 4, 5];

	const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
	// const monthTable = [2, 2, 2, 2, 23, 3, 3, 3, 3, 4, 4, 4, 4, 45];

	const [active, setActive] = useReducer<Reducer<number, number>>((_prev, next) => {
		if (next === 3) return 0;
		if (next < 0) return 2;
		return next;
	}, 0);

	const setNextView = () => setActive(active + 1);
	const setPrevious = (e: { preventDefault: () => void }) => {
		e.preventDefault();
		setActive(active - 1);
	};

	const [week, setWeek] = useReducer<Reducer<number, number>>((prev, next) => (next <= 18 && next >= 1 ? next : prev), 1);
	const [month, setMonth] = useReducer<Reducer<number, number>>((prev, next) => (next <= 5 && next >= 2 ? next : prev), 2);

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

	const [data, setData] = useState<Game[]>([]);

	const dialogRef = useRef(null);

	const openModal = (dataArg: Game[]) => {
		setData(dataArg);
		const dialog = dialogRef.current as unknown as any;

		dialog.showModal();
	};

	const closeModal = () => {
		const dialog = dialogRef.current as unknown as any;

		dialog.close();
	};

	const uploadDummydata = async () => {
		// -------------------------------Create dummy schools--------------------------
		// let i = 0;
		// const n = Object.keys(possibleData).length;
		// for (const code of Object.keys(possibleData)) {
		// 	const hasField = (Math.floor(i / (n / 4)) + 1) % 5;
		// 	const schoool = possibleData[code];
		// 	// 1 None
		// 	// 2 Alt
		// 	// 3 Single
		// 	// 4 Double
		//
		// 	const loopData = {
		// 		school_name: schoool,
		// 		school_code: code,
		// 		has_field: hasField,
		// 	};
		//
		// 	await pb.collection('schools').create(loopData);
		// 	i++;
		// }
		//
		// -------------------------------Create dummy teams--------------------------
		const records = await pb.collection('schools').getFullList({
			sort: '-created',
		});
		const n = Object.keys(possibleData).length;
		for (let i = 0; i < n; i++) {
			// const school = possibleData[code];
			const div = (Math.floor(i / (n / 3)) + 1) % 4;
			for (let j = 0; j < 4; j++) {
				const loopData = {
					school: records[i].id,
					team_type: j + 1,
					div,
				};

				await pb.collection('teams').create(loopData);
			}
		}
	};

	return (
		<section className="hover-fade relative flex h-full w-full flex-col overflow-hidden ">
			<Title text={title} />
			<div className="relative h-12 w-full shrink-0 p-2">
				<ViewBtn setNextState={setNextView} setPrevState={setPrevious} iconNum={active} />
			</div>

			<section className="my-col-2 relative grid  h-[10rem] overflow-y-scroll w-full grow auto-rows-auto gap-4 p-8 duration-300 ease-in-out">
				{active === 0 ? (
					<>
						{months.map(monthParam => (
							<Calendar key={crypto.randomUUID()} setOpen={openModal} month={monthParam} sportType={sportType} />
						))}
					</>
				) : null}
				{active === 1 ? (
					<div className="absolute inset-0 m-auto flex h-fit w-[30rem] ">
						<button type="button" onClick={() => setMonth(month - 1)}>
							<Image src={caret} alt="" className="smooth inv h-16 w-16 rotate-90 hover:scale-110 active:scale-95" />
						</button>
						<Calendar setOpen={openModal} month={month} sportType={sportType} />
						<button type="button" onClick={() => setMonth(month + 1)}>
							<Image src={caret} alt="" className="smooth inv h-16 w-16 rotate-[270deg] hover:scale-110 active:scale-95" />
						</button>
					</div>
				) : null}
				{active === 2 ? (
					<div className="absolute inset-0 m-auto flex h-32 w-full">
						<h1 className="absolute inset-x-0 top-[-8rem] mx-auto h-fit w-fit text-[2rem] font-bold text-invert">{monthNames[month]}</h1>
						<h1 className="absolute inset-x-0 top-[-5rem] mx-auto h-fit w-fit text-[2rem] font-bold text-invert">Week {week}</h1>
						<WeekCaret func={() => setWeek(week + 1)} top />
						<div className="m-2 flex h-full w-full gap-4">
							{weekData.map((day, index) => (
								<div key={crypto.randomUUID()} className="my-border bg-base my-shadow relative h-full w-full rounded-md bg-main">
									<p className="absolute inset-x-0 mx-auto h-fit w-fit px-2 font-bold">{weekDays[index]}</p>
									<div>{day}</div>
								</div>
							))}
						</div>
						<WeekCaret func={() => setWeek(week - 1)} />
					</div>
				) : null}
				{active === 3 ? <div className="absolute inset-0 m-auto h-fit w-fit text-2xl font-bold text-bug">Day tbd ...</div> : null}
			</section>

			<dialog ref={dialogRef} className="my-border my-shadow absolute inset-0 m-auto h-[80%] w-[80%] rounded-md bg-main backdrop:bg-black/40 backdrop:backdrop-blur-lg">
				<button type="button" onClick={closeModal} className="smooth-scale my-shadow my-border absolute top-4 right-4 h-fit w-fit rounded-md bg-accent hover:scale-110 active:scale-90">
					<svg className="h-10 w-10 fill-stark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
						<path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
					</svg>
				</button>

				<div className="absolute inset-0 m-auto flex h-full top-16 w-fit flex-col items-center gap-4">
					{data.map(elm => (
						<div key={crypto.randomUUID()} className="my-border p-y-2 my-shadow flex w-[40rem] flex-col items-center rounded-md bg-main text-2xl text-invert">
							<div className="flex w-fit gap-2">
								<p className="text-blue-500">{elm.homeTeam.schoolName}</p>
								<p className="font-bold text-invert">VS</p>
								<p className="text-red-500">{elm.awayTeam.schoolName}</p>
							</div>
							<p>Date : {new Date(elm.date).toDateString()}</p>
							<p>Div : {elm.homeTeam.skillDivision}</p>
							<p>{elm.homeTeam.teamType}</p>
							<p>Time : {elm.time}</p>
						</div>
					))}
				</div>
			</dialog>

			<div className="inset-x-0 mx-auto h-fit w-fit flex-col items-center">
				<Calculate sportType={sportType} />
				<Button text="testUplaod" onClick={uploadDummydata} />
				<div className="grid place-content-center ">
					<Download sportType={sportType} />
				</div>
			</div>
		</section>
	);
};
export default Middle;
