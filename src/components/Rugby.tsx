import Calendar from "./Calender";
import { CSVLink } from "react-csv";
import { v4 as uuid } from "uuid";
import Sport from "./Sport";
import {  useState } from "react";
import download from "../../assets/svg/download.svg";
import SideBtn from "./SideBtn";
import Select  from "./Select";
import FilterChip from "./FilterChip";

const Main = () => {
	const csvData = [
		[
			"Home Team",
			"Visitor Team",
			"Start Date (MM/DD/YYYY)",
			"Start Time (HH:MM AA)",
			"Duration (minutes)",
			"Details",
			"Show Details",
			"League Name",
			"Practice Type (Shared or Full)",
			"Schedule Name",
			"Venue",
		],
	];

	const months = [2, 3, 4, 5];

	const events: { [index: number]: number[] } = {
		2: [15, 16, 17],
		3: [18, 20],
		4: [6, 17, 27],
		5: [8, 21, 30],
	};

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

	const [rightOpen, setRightOpen] = useState(false);
	const [leftOpen, setLeftOpen] = useState(true);

	// const [rightOpen, setRightOpen] = useState(true);
	// const [leftOpen, setLeftOpen] = useState(true);

	const [hover, setHover] = useState(false);

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

	return (
		<Sport>
			<section
				className={
					leftOpen
						? "w-1/2 h-full rounded-bl-xl hover-fade relative flex flex-col overflow-hidden"
						: "w-0 h-full rounded-bl-xl hover-fade relative flex flex-col translate-x-[-100%] overflow-hidden"
				}
			>
				<div className="w-full h-16 p-3 ">
					<div className="w-full h-full relative bg-light rounded-md shadow-lg">
						<h1 className="font-bold absolute w-fit h-fit inset-0 m-auto">Filters</h1>
					</div>
				</div>

				<div className="flex w-ful h-10 justify-around">
					<Select multiple options={divisions} title="Div n" selected={divSelect} setSelected={(o: any) => setDivSelect(o)} />
					<Select multiple options={schools} title="School" selected={schoolSelect} setSelected={(o: any) => setSchoolSelect(o)} />
					<Select multiple options={seniorities} title="Sr/Jr" selected={senioritySelect} setSelected={(o: any) => setSenioritySelect(o)} />
				</div>

				<FilterChip options={divSelect}/>
				<FilterChip options={schoolSelect}/>
				<FilterChip options={senioritySelect}/>

				<div className=" w-full h-[calc(100%-6rem)] overflow-y-hidden grid grid-cols-4 gap-4 p-2">
					{Object.keys(teams).map(team => (
						<div key={uuid()} className="w-fit h-fit px-6 py-2 bg-light text-center shadow-xl rounded-md hover:scale-125">
							{teams[Number(team)]} {team}
						</div>
					))}
				</div>
			</section>

			<SideBtn setState={setLeftOpen} state={leftOpen} side={false} />

			<section className="w-full h-full flex flex-col overflow-hidden hover-fade relative">
				<section className="w-full h-16 p-3">
					<div className="w-full h-full relative bg-light rounded-md shadow-lg">
						<h1 className="font-bold absolute w-fit h-fit inset-0 m-auto">Schedule</h1>
					</div>
				</section>

				<section className="h-full w-full  grid my-col-2 auto-rows-auto gap-4 p-8 place-content-center justify-evenly overflow-hidden">
					{months.map(month => (
						<Calendar key={uuid()} events={events[month]} month={month} />
					))}
				</section>

				<div className="w-full h-[10%] grid place-content-center ">
					<CSVLink filename={"test.csv"} data={csvData} >
						<button
							onMouseEnter={() => setHover(true)}
							onMouseLeave={() => setHover(false)}
							className={
								hover
									? "pl-2 w-[9.5rem] h-14  m-2 rounded-lg bg-light active:scale-90 duration-75 ease-in-out flex items-center overflow-hidden"
									: "overflow-hidden w-[3rem] p-2 h-14   m-2 rounded-lg bg-light hover:scale-110 active:scale-90 duration-75 ease-in-out flex items-center"
							}
						>
							<img src={download} alt="" srcSet="" className="w-8 h-8 " />

							<p className={hover ? "w-fit h-fit whitespace-nowrap duration-300" : "duration-300 whitespace-nowrap w-fit h-fit translate-x-[-150%]"}>Download Csv</p>
						</button>
					</CSVLink>
				</div>
			</section>

			<SideBtn setState={setRightOpen} state={rightOpen} side={true} />

			<section className={rightOpen ? "w-1/2 h-full rounded-bl-xl relative hover-fade overflow-hidden" : "w-0 h-full rounded-bl-xl relative hover-fade translate-x-full overflow-hidden"}>
				<div className="w-[95%] h-10 absolute inset-x-0 mx-auto bg-light rounded-md shadow-lg mt-2">
					<h1 className="font-bold absolute w-fit h-fit inset-0 m-auto">Add/Edit Events</h1>
				</div>
				<div className="w-full h-full py-6 translate-y-8">
					<h1 className="text-center">Season Start/End</h1>
					<div className="flex justify-around">
						<p>Start</p>
						<input type="text" />
					</div>

					<div className="flex justify-around">
						<p>End</p>
						<input type="text" />
					</div>
					<h1 className="text-center">Breaks/Holidays</h1>
					<div className="flex justify-around">
						<p>Event</p>
						<input type="text" />
					</div>
				</div>
			</section>
		</Sport>
	);
};
export default Main;
