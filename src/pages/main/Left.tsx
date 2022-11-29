import { useState } from 'react';

import data, { divisions, schools, seniorities } from '@assets/data.json';
import FilterChip from './FilterChip';
import Filter from './Filter';

const Left = ({ leftOpen }: any) => {
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
		<section className={` ${leftOpen ? 'w-1/2' : 'w-0 translate-x-[-100%]'} hover-fade relative flex h-full flex-col  overflow-hidden  rounded-bl-xl `}>
			<div className="flex h-16 w-full gap-2 ">
				<h2 className="m-auto h-fit w-fit rounded-md bg-base py-2 px-4 font-semibold shadow-md duration-75 ease-in-out hover:scale-110 active:scale-90">Team Info</h2>
				<h2 className="m-auto h-fit w-fit rounded-md bg-base py-2 px-4 font-semibold shadow-md duration-75 ease-in-out hover:scale-110 active:scale-90">Date Info</h2>
			</div>
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
		</section>
	);
};
export default Left;
