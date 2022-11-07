import { v4 as uuid } from 'uuid';
import { useContext, useState } from 'react';

import { divisions, schools, seniorities } from '@assets/data.json';
import { Theme } from '@components/App';
import FilterChip from './FilterChip';
import { Select as Filter } from './Filter';
import Title from './Title';

const Left = ({ leftOpen, teams }: any) => {
	const [divSelect, setDivSelect] = useState([]);
	const [schoolSelect, setSchoolSelect] = useState([]);
	const [senioritySelect, setSenioritySelect] = useState([]);

	const theme = useContext(Theme);

	return (
		<section className={` ${leftOpen ? 'w-1/2' : 'w-0 translate-x-[-100%]'} overflow-hidden relative h-full rounded-bl-xl  hover-fade  duration-200 ease-in-out flex flex-col`}>
			<div className="w-full h-16 p-3 ">
				<Title text="Filters" />
			</div>

			<div className="flex justify-around h-10 w-full ">
				<Filter options={divisions} title="Div n" selected={divSelect} setSelected={(o: any) => setDivSelect(o)} />
				<Filter options={schools} title="School" selected={schoolSelect} setSelected={(o: any) => setSchoolSelect(o)} />
				<Filter options={seniorities} title="Sr/Jr" selected={senioritySelect} setSelected={(o: any) => setSenioritySelect(o)} />
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
