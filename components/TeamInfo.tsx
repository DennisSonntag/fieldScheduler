import { Dispatch, SetStateAction, useContext, useRef } from 'react';

import { filterContext, schoolNameContext, teamInfoContext } from 'pages/main';
// import calculate from '@ts/calculate';
import { makeMatchPairings, newMatchMake, separatePerTeam, separatePerTeam1 } from '@ts/matchUp';
import PocketBase from 'pocketbase';
import Filter from './Filter';
import FilterChip from './FilterChip';

const pb = new PocketBase('http://127.0.0.1:8090');

const TeamInfo = () => {
	const schoolData = useContext(schoolNameContext);
	const schools = schoolData.map(elm => elm.school_name);
	const school_ids = schoolData.map(elm => elm.id);
	const teamsTest = useContext(teamInfoContext);
	const filterData = useContext(filterContext);

	const [divSelect, setDivSelect] = filterData[0];
	const [schoolSelect, setSchoolSelect] = filterData[1];
	const [senioritySelect, setSenioritySelect] = filterData[2];
	const [genderSelect, setGenderSelect] = filterData[3];

	const teams = [
		{ name: 'Team 1', div: 1, 'sr/jr': 'sr' },
		{ name: 'Team 2', div: 1, 'sr/jr': 'sr' },
		{ name: 'Team 3', div: 1, 'sr/jr': 'sr' },
		{ name: 'Team 4', div: 1, 'sr/jr': 'sr' },
		{ name: 'Team 5', div: 1, 'sr/jr': 'sr' },
		{ name: 'Team 6', div: 1, 'sr/jr': 'sr' },
		{ name: 'Team 7', div: 1, 'sr/jr': 'sr' },
		{ name: 'Team 8', div: 1, 'sr/jr': 'sr' },
		{ name: 'Team 9', div: 1, 'sr/jr': 'sr' },
		{ name: 'Team 10', div: 1, 'sr/jr': 'sr' },
		{ name: 'Team 11', div: 1, 'sr/jr': 'sr' },
		{ name: 'Team 12', div: 1, 'sr/jr': 'sr' },
	];

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

	const handleClickTest = () => {
		const range = (x: number, y: number): number[] => (x > y ? [] : [x, ...range(x + 1, y)]);
		const numOfTeams = 8;

		const matchings = makeMatchPairings(range(1, numOfTeams));
		const sepMatchings = separatePerTeam(matchings, numOfTeams);

		const test = newMatchMake(range(1, numOfTeams));

		console.log(sepMatchings);
		console.log(test);
	};

	return (
		<div className="relative flex h-full w-full flex-col gap-2">
			<dialog ref={dialogRef} className="my-blur my-border my-shadow absolute inset-0 m-auto h-[80%] w-[80%] rounded-xl bg-main backdrop:bg-black backdrop:opacity-80">
				<h1 className=" my-shadow my-border absolute inset-x-0 top-4 mx-auto h-fit w-fit rounded-md bg-accent p-3 text-xl font-bold text-stark">Add/Edit Team data</h1>
				<button type="button" onClick={closeModal} className="smooth-scale my-shadow my-border absolute top-4 right-4 h-fit w-fit rounded-md bg-accent hover:scale-110 active:scale-90">
					<svg className="h-10 w-10 fill-stark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
						<path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
					</svg>
				</button>
			</dialog>
			<button title="Edit Team Data" onClick={handleClickTest} type="button" className="my-shadow my-border smooth-scale relative inset-x-0 mx-auto h-fit w-fit rounded-md bg-main p-3 font-bold text-invert hover:scale-110 active:scale-90">
				Test
			</button>
			<button title="Edit Team Data" onClick={handleClick} type="button" className="my-shadow my-border smooth-scale relative inset-x-0 mx-auto h-fit w-fit rounded-md bg-main p-3 font-bold text-invert hover:scale-110 active:scale-90">
				Edit Team data
			</button>
			<div className="my-col-3 grid h-fit w-full auto-rows-auto items-center justify-around gap-2">
				<Filter options={divisions} title="Div n" selected={divSelect as string[]} setSelected={setDivSelect as Dispatch<SetStateAction<string[]>>} />
				<Filter scroll options={schools} title="School" selected={schoolSelect as string[]} setSelected={setSchoolSelect as Dispatch<SetStateAction<string[]>>} />
				<Filter options={seniorities} title="Sr/Jr" selected={senioritySelect as string[]} setSelected={setSenioritySelect as Dispatch<SetStateAction<string[]>>} />
				<Filter options={gender} title="Gender" selected={genderSelect as string[]} setSelected={setGenderSelect as Dispatch<SetStateAction<string[]>>} />
			</div>

			<FilterChip selected={divSelect as string[]} />
			<FilterChip selected={schoolSelect as string[]} />
			<FilterChip selected={senioritySelect as string[]} />
			<FilterChip selected={genderSelect as string[]} />

			<div className=" z-0 grid h-auto grow grid-cols-3 gap-4 p-2">
				{teams.map(team => (
					<div key={team.name} className="smooth-scale no-move my-border my-shadow relative grid h-full w-full cursor-pointer place-content-center rounded-md bg-main text-center text-invert hover:scale-105 active:scale-90 ">
						<p className="h-fit w-fit text-center">{team.name}</p>
						<p className="h-fit w-fit text-center">Div {team.div}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default TeamInfo;
