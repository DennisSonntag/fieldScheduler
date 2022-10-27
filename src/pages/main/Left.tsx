import { v4 as uuid } from 'uuid';
import { useContext, useState } from 'react';

import { Theme } from '@components/App';
import FilterChip from './FilterChip';
import { Select } from './Filter';
import Title from './Title';

const Left = ({ leftOpen }: any) => {
	const divisions = [
		{ label: 'Div 1', value: 1 },
		{ label: 'Div 2', value: 2 },
		{ label: 'Div 3', value: 3 },
	];

	const schools = [
		{ label: 'Churchill', value: 1 },
		{ label: 'Bowless', value: 2 },
		{ label: 'Other schools', value: 3 },
	];

	const seniorities = [
		{ label: 'Senior', value: 1 },
		{ label: 'Junior', value: 2 },
	];

	const [divSelect, setDivSelect] = useState([]);
	const [schoolSelect, setSchoolSelect] = useState([]);
	const [senioritySelect, setSenioritySelect] = useState([]);
	const teams: { [index: number]: string } = {
		1: 'Team',
		2: 'Team',
		3: 'Team',
		4: 'Team',
		5: 'Team',
		6: 'Team',
		7: 'Team',
		8: 'Team',
		9: 'Team',
		10: 'Team',
		11: 'Team',
		12: 'Team',
	};

	const theme = useContext(Theme);

	return (
		<section className={` ${leftOpen ? 'w-1/2' : 'w-0 translate-x-[-100%]'} overflow-x-hidden relative h-full rounded-bl-xl  hover-fade  duration-200 ease-in-out flex flex-col`}>
			<div className="w-full h-16 p-3 ">
				<Title text="Filters" />
			</div>

			<div className="flex justify-around h-10 w-full ">
				<Select multiple options={divisions} title="Div n" selected={divSelect} setSelected={(o: any) => setDivSelect(o)} />
				<Select multiple options={schools} title="School" selected={schoolSelect} setSelected={(o: any) => setSchoolSelect(o)} />
				<Select multiple options={seniorities} title="Sr/Jr" selected={senioritySelect} setSelected={(o: any) => setSenioritySelect(o)} />
			</div>

			<FilterChip options={divisions} selected={divSelect} />
			<FilterChip options={schools} selected={schoolSelect} />
			<FilterChip options={seniorities} selected={senioritySelect} />

			<div className=" flex-grow grid grid-cols-3 gap-4 p-2">
				{Object.keys(teams).map(team => (
					<div key={uuid()} className={`p-2 truncate text-center rounded-md shadow-xl w-fit h-fit ${theme ? 'bg-dark text-white' : 'bg-light text-black'} hover:scale-125`}>
						{teams[Number(team)]} {team}
					</div>
				))}
			</div>
		</section>
	);
};
export default Left;
