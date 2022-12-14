import { Dispatch, SetStateAction, useContext, useRef } from 'react';

import { filterContext, schoolNameContext } from 'pages/main';
import Filter from './Filter';
import FilterChip from './FilterChip';

const TeamInfo = () => {
	const schools = useContext(schoolNameContext);
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

	return (
		<div className="w-full h-full relative flex flex-col gap-2">
			<dialog ref={dialogRef} className="w-[80%] h-[80%] backdrop:bg-black backdrop:opacity-75 bg-base rounded-xl">
				<h1 className="absolute inset-x-0 mx-auto h-fit w-fit text-xl text-invert shadow-lg font-bold bg-mid p-3 rounded-md">Add/Edit Team data</h1>
			</dialog>
			<button onClick={handleClick} type="button" className="w-fit h-fit text-stark bg-base p-3 rounded-md relative inset-x-0 mx-auto font-bold hover:scale-110 active:scale-90 smooth">
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
					<div key={team.name} className="smooth no-move relative grid h-full w-full cursor-pointer place-content-center rounded-md bg-base text-center text-stark shadow-xl hover:scale-105 active:scale-90 ">
						<p className="h-fit w-fit text-center">{team.name}</p>
						<p className="h-fit w-fit text-center">Div {team.div}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default TeamInfo;
