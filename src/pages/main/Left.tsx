import { v4 as uuid } from 'uuid';
import { useContext, useState } from 'react';

import { divisions, schools, seniorities } from '@assets/data.json';
import FilterChip from './FilterChip';
import Filter from './Filter';
import Title from './Title';
import { activePageContext } from './Sport';

const Left = ({ leftOpen }: any) => {
	const activePage = useContext(activePageContext);
	// const teams = activePage ? data.rugby.divisions[1].jr.teams : data.soccer.divisions[1].jr.teams;
	const [divSelect, setDivSelect] = useState([]);
	const [schoolSelect, setSchoolSelect] = useState([]);
	const [senioritySelect, setSenioritySelect] = useState([]);

	return (
		<section className={` ${leftOpen ? 'w-1/2' : 'w-0 translate-x-[-100%]'} hover-fade relative flex h-full  flex-col  overflow-hidden rounded-bl-xl`}>
			<div className="h-16 w-full p-3 ">
				<Title text="Filters" />
			</div>
			<div className="my-col-3 grid h-fit w-full auto-rows-auto items-center justify-around gap-2">
				<Filter options={divisions} title="Div n" selected={divSelect} setSelected={(o: any) => setDivSelect(o)} />
				<Filter scroll options={schools} title="School" selected={schoolSelect} setSelected={(o: any) => setSchoolSelect(o)} />
				<Filter options={seniorities} title="Sr/Jr" selected={senioritySelect} setSelected={(o: any) => setSenioritySelect(o)} />
			</div>

			<div className="h-4" />

			<FilterChip options={divisions} selected={divSelect} />
			<FilterChip options={schools} selected={schoolSelect} />
			<FilterChip options={seniorities} selected={senioritySelect} />

			<div className=" z-0 grid h-auto grow grid-cols-3 gap-4 p-2">
				{/* {Object.keys(teams).map(team => (
					<div key={uuid()} className="smooth no-move relative h-full w-full cursor-pointer rounded-md bg-base text-stark shadow-xl hover:scale-105 active:scale-90">
						<p className="absolute inset-0 m-auto h-fit w-fit text-center">
							{teams[Number(team)]} {team}
						</p>
					</div>
				))} */}
			</div>
		</section>
	);
};
export default Left;
