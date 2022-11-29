import { useState } from 'react';

import data, { divisions, schools, seniorities } from '@assets/data.json';
import FilterChip from './FilterChip';
import Filter from './Filter';

const TeamInfo = () => {
	type TeamType = {
		name: string;
		div: number;
		'sr/jr': string;
	}[];
	const teams = useState<TeamType>(data.rugby.divisions[1].sr.teams)[0];
	const [divSelect, setDivSelect] = useState([]);
	const [schoolSelect, setSchoolSelect] = useState([]);
	const [senioritySelect, setSenioritySelect] = useState([]);

	return (
		<>
			<div className="my-col-3 grid h-fit w-full auto-rows-auto items-center justify-around gap-2">
				<Filter options={divisions} title="Div n" selected={divSelect} setSelected={(o: any) => setDivSelect(o)} />
				<Filter scroll options={schools} title="School" selected={schoolSelect} setSelected={(o: any) => setSchoolSelect(o)} />
				<Filter options={seniorities} title="Sr/Jr" selected={senioritySelect} setSelected={(o: any) => setSenioritySelect(o)} />
			</div>

			{/* <div className="h-4" /> */}

			<FilterChip options={divisions} selected={divSelect} />
			<FilterChip options={schools} selected={schoolSelect} />
			<FilterChip options={seniorities} selected={senioritySelect} />

			<div className=" z-0 grid h-auto grow grid-cols-3 gap-4 p-2">
				{teams.map(team => (
					<div key={team.name} className="smooth no-move relative grid h-full w-full cursor-pointer place-content-center rounded-md bg-base text-center text-stark shadow-xl hover:scale-105 active:scale-90 ">
						<p className="h-fit w-fit text-center">{team.name}</p>
						<p className="h-fit w-fit text-center">Div {team.div}</p>
					</div>
				))}
			</div>
		</>
	);
};
export default TeamInfo;
