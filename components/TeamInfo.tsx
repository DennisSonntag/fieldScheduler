/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { Dispatch, SetStateAction, useRef } from 'react';
import { divAtom, GameStateAtom, schoolDataAtom, schoolAtom, seniorityAtom, genderAtom } from 'pages/main';
import { scheduleGames } from '@ts/matchUp';
import { useAtom } from 'jotai';
import Filter from './Filter';
import FilterChip from './FilterChip';
import EditData from './EditData';

const TeamInfo = () => {
	const setGameData = useAtom(GameStateAtom)[1];
	const [schoolData] = useAtom(schoolDataAtom);
	const schoolNames = schoolData.map(elm => elm.school_name.trim());
	console.log(schoolData);

	const [divSelect, setDivSelect] = useAtom(divAtom);
	const [schoolSelect, setSchoolSelect] = useAtom(schoolAtom);
	const [senioritySelect, setSenioritySelect] = useAtom(seniorityAtom);
	const [genderSelect, setGenderSelect] = useAtom(genderAtom);

	const divisions = ['Div 1', 'Div 2', 'Div 3'];
	const seniorities = ['Sr', 'Jr'];
	const gender = ['Girls', 'Boys'];

	const dialogRef = useRef(null);

	const handleClick = () => {
		const dialog = dialogRef.current as unknown as any;

		dialog.showModal();
	};

	const closeModal = () => {
		const dialog = dialogRef.current as unknown as any;

		dialog.close();
	};

	const handleClickTest = async () => {
		const startDate = new Date('2023-3-1');
		const endDate = new Date('2023-6-30');
		const teamsPerSubdivision = [6, 12, 8, 4, 10, 6, 12, 8, 4, 10, 6, 12];
		const noGamesOnDates = ['2023-4-1'];
		const res = scheduleGames(teamsPerSubdivision, 12, true, noGamesOnDates, 6, 16, startDate, endDate);
		// const gameDays = res.map(elm => elm.day);
		setGameData(res);
	};

	const range = (x: number, y: number): number[] => (x > y ? [] : [x, ...range(x + 1, y)]);

	return (
		// eslint-disable-next-line react/jsx-no-comment-textnodes
		<div className="relative flex h-full w-full flex-col gap-2">
			<dialog onClick={e => e.stopPropagation()} ref={dialogRef} className="my-border my-shadow absolute inset-0 m-auto h-[80%] w-[80%] rounded-xl bg-main backdrop:bg-black backdrop:opacity-80">
				<EditData close={closeModal} />
			</dialog>

			{/* <button title="Edit Team Data" onClick={handleClickTest} type="button" className="my-shadow my-border smooth-scale relative inset-x-0 mx-auto h-fit w-fit rounded-md bg-main p-3 font-bold text-invert hover:scale-110 active:scale-90">
				Test
			</button> */}

			<button title="Edit Team Data" onClick={handleClick} type="button" className="my-shadow my-border smooth-scale relative inset-x-0 mx-auto h-fit w-fit rounded-md bg-main p-3 font-bold text-invert hover:scale-110 active:scale-90">
				Edit Team data
			</button>

			<button title="Edit Team Data" onClick={handleClickTest} type="button" className="my-shadow my-border smooth-scale relative inset-x-0 mx-auto h-fit w-fit rounded-md bg-main p-3 font-bold text-invert hover:scale-110 active:scale-90">
				Calculate Schedule
			</button>
			<div className="my-col-3 grid h-fit w-full auto-rows-auto items-center justify-around gap-2">
				<Filter options={divisions} title="Div" selected={divSelect as string[]} setSelected={setDivSelect as Dispatch<SetStateAction<string[]>>} />
				<Filter scroll options={schoolNames} title="School" selected={schoolSelect as string[]} setSelected={setSchoolSelect as Dispatch<SetStateAction<string[]>>} />
				<Filter options={seniorities} title="Sr/Jr" selected={senioritySelect as string[]} setSelected={setSenioritySelect as Dispatch<SetStateAction<string[]>>} />
				<Filter options={gender} title="Gender" selected={genderSelect as string[]} setSelected={setGenderSelect as Dispatch<SetStateAction<string[]>>} />
			</div>

			<FilterChip selected={divSelect as string[]} />
			<FilterChip selected={schoolSelect as string[]} />
			<FilterChip selected={senioritySelect as string[]} />
			<FilterChip selected={genderSelect as string[]} />

			<div className=" z-0 grid h-auto grow grid-cols-3 gap-4 p-2">
				{range(1, 12).map(() => (
					<div key={crypto.randomUUID()} className="smooth-scale no-move my-border my-shadow relative grid h-full w-full cursor-pointer place-content-center rounded-md bg-main text-center text-invert hover:scale-105 active:scale-90 ">
						<p className="h-fit w-fit text-center">{schoolSelect as string[]}</p>
						<p className="h-fit w-fit text-center">{senioritySelect as string[]}</p>
						<p className="h-fit w-fit text-center">{divSelect as string[]}</p>
						<p className="h-fit w-fit text-center">{genderSelect as string[]}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default TeamInfo;
