import { CSVLink } from "react-csv";
import { useState } from "react";
import Cal from "./Calender";
import Btn from "./Btn";

const App = () => {
	const csvData = [
		["firstname", "lastname", "email"],
		["Ahmed", "Tomi", "ah@smthing.co.com"],
		["Raed", "Labes", "rl@smthing.co.com"],
		["Yezzi", "Min l3b", "ymin@cocococo.com"],
	];

	const [divActive, setDivActive] = useState(false);
	const [startDate, setStartDate] = useState(null);
	const months = [1, 2, 3, 4, 5, 6];

	const teams = {
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
							{Object.keys(teams).map(team => (
								<div className="w-fit h-fit px-6 py-2 bg-white ml-6 my-6 text-center shadow-xl rounded-md hover:scale-125">
									<a href="/Login">
										{teams[team]} {team}
									</a>
								</div>
							))}
						</div>
					</div>

					<div className="w-full h-full   flex flex-col">
						<section className="h-5/6 w-full relative grid  grid-cols-3 grid-rows-2 p-2 gap-2">
							{months.map(month => (
								<Cal month={month} />
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
								{/* <DatePicker onChange={(arg: any) => setStartDate(arg)} value={startDate} /> */}
							</div>

							<div className="flex justify-around">
								<p>End</p>
								{/* <DatePicker onChange={(arg: any) => setStartDate(arg)} value={startDate} /> */}
							</div>
						</div>

						<div className="w-full h-full py-6">
							<h1 className="text-center">Breaks/Holidays</h1>
							<div className="flex justify-around">
								<p>Event</p>
								{/* <DatePicker onChange={(arg: any) => setStartDate(arg)} value={startDate} /> */}
							</div>
						</div>
					</div>
				</section>
			</main>
		</>
	);
};

export default App;
