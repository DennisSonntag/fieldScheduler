import Btn from "./Btn";
import Calendar from "./Calender";
import { CSVLink } from "react-csv";
import { v4 as uuid } from 'uuid';

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

	return (
		<main className="w-full h-full rounded-xl shadow-2xl ">
			<section className="flex w-full h-[calc(100%-6rem)] bg-gray-700 rounded-bl-xl rounded-br-xl">
				<div className="w-1/2 h-full  rounded-bl-xl opacity-40 hover:opacity-100 duration-150 ease-in-out relative ">
					<div className="w-[95%] h-10 absolute inset-x-0 mx-auto bg-white rounded-md shadow-lg mt-2">
						<h1 className="font-bold absolute w-fit h-fit inset-0 m-auto">Filters</h1>
					</div>

					<div className="pt-14 flex w-ful h-10 justify-around">
						<Btn title="Div n" />
						<Btn title="School" />
						<Btn title="Jr/Sr" />
					</div>
					<div className="translate-y-12 overflow-auto w-full h-[calc(100%-7rem)]">
						{Object.keys(teams).map(team => {
							return (
								<div key={uuid()} className="w-fit h-fit px-6 py-2 bg-white ml-6 my-6 text-center shadow-xl rounded-md hover:scale-125">
									{teams[Number(team)]} {team}
								</div>
							);
						})}
					</div>
				</div>

				<div className="w-full h-full flex flex-col overflow-auto opacity-40 hover:opacity-100 duration-150 ease-in-out relative">
					<div className="w-[95%] h-10 absolute inset-x-0 mx-auto bg-white rounded-md shadow-lg mt-2">
						<h1 className="font-bold absolute w-fit h-fit inset-0 m-auto">Schedule</h1>
					</div>
					<section className="h-fit w-fit relative grid grid-cols-2 grid-rows-2 gap-10 p-2 m-auto inset-0 translate-y-6">
						{months.map(month => (
							<Calendar key={uuid()} events={events[month]} month={month} />
						))}
					</section>

					<section className="w-full h-[10%] grid place-content-center">
						<button className="w-fit h-fit p-2 m-2 rounded-lg bg-white hover:scale-110 active:scale-90 duration-75 ease-in-out">
							<CSVLink  filename={"test.csv"} data={csvData}>
								Download csv
							</CSVLink>
						</button>
					</section>
				</div>

				<div className="w-1/2 h-full  rounded-bl-xl opacity-40 hover:opacity-100 duration-150 ease-in-out relative">
					<div className="w-[95%] h-10 absolute inset-x-0 mx-auto bg-white rounded-md shadow-lg mt-2">
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
				</div>
			</section>
		</main>
	);
};
export default Main;
