import { CSVLink } from "react-csv";
import Btn from "./Btn";
import Calendar from "./Calender";

const App = () => {
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

	const months = [ 2, 3, 4, 5];

	const events: { [index: number]: number[] } = {
		2: [ 15, 16, 17],
		3: [18, 20],
		4: [ 6, 17, 27],
		5: [ 8, 21, 30],
	};

	const teams: { [index: number]: string } = {
		1: "team",
		2: "team",
		3: "team",
		4: "team",
		5: "team",
		6: "team",
		7: "team",
		8: "team",
		9: "team",
		10: "team",
		11: "team",
		12: "team",
	};

	return (
		<>
			<a href="/">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-6 h-6 absolute top-2 right-2 hover:scale-125 active:scale-90">
					<path d="M160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96C43 32 0 75 0 128V384c0 53 43 96 96 96h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H96c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32h64zM504.5 273.4c4.8-4.5 7.5-10.8 7.5-17.4s-2.7-12.9-7.5-17.4l-144-136c-7-6.6-17.2-8.4-26-4.6s-14.5 12.5-14.5 22v72H192c-17.7 0-32 14.3-32 32l0 64c0 17.7 14.3 32 32 32H320v72c0 9.6 5.7 18.2 14.5 22s19 2 26-4.6l144-136z" />
				</svg>
			</a>
			<main className="w-full h-full rounded-xl shadow-2xl ">
				<nav className="flex w-full h-10">
					<div className=" bg-gray-700 w-full h-full grid justify-center relative rounded-tl-xl rounded-tr-xl">
						<h1 className=" text-lg font-bold w-fit h-fit absolute inset-0 m-auto">Rugby</h1>
					</div>

					<div className=" bg-stone-400 w-full h-full grid justify-center relative rounded-tl-xl rounded-tr-xl">
						<h1 className="text-lg text-gray-500 font-bold w-fit h-fit absolute inset-0 m-auto color">Soccer</h1>
					</div>
				</nav>

				{/* title bar */}
				<section className="flex justify-around p-2 gap-2 bg-gray-700">
					<div className="w-1/2 h-10 relative bg-white rounded-md shadow-lg">
						<h1 className="font-bold absolute w-fit h-fit inset-0 m-auto">Teams</h1>
					</div>
					<div className="w-full h-10 relative bg-white rounded-md shadow-lg">
						<h1 className="font-bold absolute w-fit h-fit inset-0 m-auto">Schedule</h1>
					</div>
					<div className="w-1/2 h-10 relative bg-white rounded-md shadow-lg">
						<h1 className="font-bold absolute w-fit h-fit inset-0 m-auto">Add/Edit events</h1>
					</div>
				</section>

				<section className="flex w-full h-[calc(100%-6rem)] bg-gray-700 rounded-bl-xl rounded-br-xl">
					<div className="w-1/2 h-full  rounded-bl-xl">
						<div className="flex w-ful h-10 justify-around">
							<Btn title="Div n" />
							<Btn title="School" />
							<Btn title="Jr/Sr" />
						</div>
						<div className="overflow-auto w-full h-[calc(100%-3rem)]">
							{Object.keys(teams).map(team => {
								let teamIndex = Number(team);
								return (
									<div className="w-fit h-fit px-6 py-2 bg-white ml-6 my-6 text-center shadow-xl rounded-md hover:scale-125">
										{teams[teamIndex]} {team}
									</div>
								);
							})}
						</div>
					</div>

					<div className="w-full h-full flex flex-col">
						<section className="h-fit w-fit relative grid grid-cols-2 grid-rows-2 gap-20 p-2 m-auto inset-0">
							{months.map(month => (
								<Calendar events={events[month]} month={month} />
							))}
						</section>

						<section className="w-full h-[10%] grid place-content-center">
							<button className="w-fit h-fit p-2 rounded-lg bg-white hover:scale-110 active:scale-90 duration-75 ease-in-out">
								<CSVLink filename={"test.csv"} data={csvData}>
									Download csv
								</CSVLink>
							</button>
						</section>
					</div>

					<div className="w-1/2 h-full   rounded-br-xl flex flex-col ">
						<div className="w-full h-full py-6">
							<h1 className="text-center">Season Start/End</h1>
							<div className="flex justify-around">
								<p>Start</p>
								<input type="text" />
							</div>

							<div className="flex justify-around">
								<p>End</p>
								<input type="text" />
							</div>
						</div>

						<div className="w-full h-full py-6">
							<h1 className="text-center">Breaks/Holidays</h1>
							<div className="flex justify-around">
								<p>Event</p>
								<input type="text" />
							</div>
						</div>
					</div>
				</section>
			</main>
		</>
	);
};

export default App;
