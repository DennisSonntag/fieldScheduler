import { v4 as uuid } from 'uuid';
import { useState } from 'react';

import { divisions, schools, seniorities } from '@assets/data.json';
import FilterChip from './FilterChip';
import { Select as Filter } from './Filter';
import Title from './Title';

const Left = ({ leftOpen, teams }: any) => {
	const [divSelect, setDivSelect] = useState([]);
	const [schoolSelect, setSchoolSelect] = useState([]);
	const [senioritySelect, setSenioritySelect] = useState([]);

	return (
		<section className={` ${leftOpen ? 'w-1/2' : 'w-0 translate-x-[-100%]'} hover-fade relative flex h-full  flex-col  overflow-hidden rounded-bl-xl`}>
			<div className="h-16 w-full p-3 ">
				<Title text="Filters" />
			</div>

			<div className="flex h-10 w-full justify-around ">
				<Filter options={divisions} title="Div n" selected={divSelect} setSelected={(o: any) => setDivSelect(o)} />
				<Filter options={schools} title="School" selected={schoolSelect} setSelected={(o: any) => setSchoolSelect(o)} />
				<Filter options={seniorities} title="Sr/Jr" selected={senioritySelect} setSelected={(o: any) => setSenioritySelect(o)} />
			</div>

			<FilterChip options={divisions} selected={divSelect} />
			<FilterChip options={schools} selected={schoolSelect} />
			<FilterChip options={seniorities} selected={senioritySelect} />

			<div className=" grid flex-grow grid-cols-3 gap-4 p-2">
				{Object.keys(teams).map(team => (
					<div key={uuid()} className="h-fit w-fit truncate rounded-md bg-base p-2 text-center text-stark shadow-xl hover:scale-125">
						{teams[Number(team)]} {team}
					</div>
				))}
			</div>
		</section>
	);
};
export default Left;
