import { v4 as uuid } from "uuid";
import { useState } from "react";

import FilterChip from "./FilterChip";
import Select from "./Select";

const Left = ({ leftOpen }: any) => {
	const divisions = [
		{ label: "Div 1", value: 1 },
		{ label: "Div 2", value: 2 },
		{ label: "Div 3", value: 3 },
	];

	const schools = [
		{ label: "Churchill", value: 1 },
		{ label: "Bowless", value: 2 },
		{ label: "Other schools", value: 3 },
	];

	const seniorities = [
		{ label: "Senior", value: 1 },
		{ label: "Junior", value: 2 },
	];

	const [divSelect, setDivSelect] = useState([]);
	const [schoolSelect, setSchoolSelect] = useState([]);
	const [senioritySelect, setSenioritySelect] = useState([]);
	const teams: { [index: number]: string } = {
		1: "Team",
		2: "Team",
		3: "Team",
		4: "Team",
		5: "Team",
		6: "Team",
		7: "Team",
		8: "Team",
		9: "Team",
		10: "Team",
		11: "Team",
		12: "Team",
	};

	return (
		<section className={` ${leftOpen ? "w-1/2" : "w-0 translate-x-[-100%]"} h-full rounded-bl-xl relative hover-fade overflow-hidden`}>
			<div className="w-full h-16 p-3 ">
				<div className="relative w-full h-full rounded-md shadow-lg bg-light">
					<h1 className="absolute inset-0 m-auto font-bold w-fit h-fit">Filters</h1>
				</div>
			</div>

			<div className="flex justify-around h-10 w-ful">
				<Select multiple options={divisions} title="Div n" selected={divSelect} setSelected={(o: any) => setDivSelect(o)} />
				<Select multiple options={schools} title="School" selected={schoolSelect} setSelected={(o: any) => setSchoolSelect(o)} />
				<Select multiple options={seniorities} title="Sr/Jr" selected={senioritySelect} setSelected={(o: any) => setSenioritySelect(o)} />
			</div>

			<FilterChip options={divSelect} />
			<FilterChip options={schoolSelect} />
			<FilterChip options={senioritySelect} />

			<div className=" w-full h-[calc(100%-6rem)] overflow-y-hidden grid grid-cols-4 gap-4 p-2">
				{Object.keys(teams).map(team => (
					<div key={uuid()} className="px-6 py-2 text-center rounded-md shadow-xl w-fit h-fit bg-light hover:scale-125">
						{teams[Number(team)]} {team}
					</div>
				))}
			</div>
		</section>
	);
};

export default Left;
