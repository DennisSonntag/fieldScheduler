import { useContext, useRef, useState } from 'react';

// eslint-disable-next-line import/no-cycle
import { schoolNameContext } from 'pages/main';
// import { calculate } from '@ts/calculate';
import Filter from './Filter';
import FilterChip from './FilterChip';
import Title from './Title';

const TeamInfo = () => {
	const schools = useContext(schoolNameContext);

	const [divSelect, setDivSelect] = useState<string[]>([]);
	const [schoolSelect, setSchoolSelect] = useState<string[]>([]);
	const [senioritySelect, setSenioritySelect] = useState<string[]>([]);
	const [sexSelect, setSexSelect] = useState<string[]>([]);

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
	const sex = ['Girls', 'Boys'];

	// const uploadData = async () => {
	// 	calculate();
	// };

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
				<Filter options={divisions} title="Div n" selected={divSelect} setSelected={setDivSelect} />
				<Filter scroll options={schools} title="School" selected={schoolSelect} setSelected={setSchoolSelect} />
				<Filter options={seniorities} title="Sr/Jr" selected={senioritySelect} setSelected={setSenioritySelect} />
				<Filter options={sex} title="Sex" selected={sexSelect} setSelected={setSexSelect} />
			</div>

			<FilterChip selected={divSelect} />
			<FilterChip selected={schoolSelect} />
			<FilterChip selected={senioritySelect} />
			<FilterChip selected={sexSelect} />

			{/* <button type="button" onClick={uploadData}>
				Upload Data
			</button> */}

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
