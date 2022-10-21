import { CSVLink } from "react-csv";
import { useState } from "react";
import { v4 as uuid } from "uuid";

import Calendar from "./Calender";
import download from "../../assets/svg/download.svg";

const Middle = () => {
const months = [2, 3, 4, 5];
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

	const events: { [index: number]: number[] } = {
		2: [15, 16, 17],
		3: [18, 20],
		4: [6, 17, 27],
		5: [8, 21, 30],
	};

	const [hover, setHover] = useState(false);
	return (

		<section className="relative flex flex-col w-full h-full overflow-hidden hover-fade">
			<section className="w-full h-16 p-3">
				<div className="relative w-full h-full rounded-md shadow-lg bg-light">
					<h1 className="absolute inset-0 m-auto font-bold w-fit h-fit">Schedule</h1>
				</div>
			</section>

			<section className="grid w-full h-full gap-4 p-8 overflow-hidden my-col-2 auto-rows-auto place-content-center justify-evenly">
				{months.map(month => (
					<Calendar key={uuid()} events={events[month]} month={month} />
				))}
			</section>

			<div className="w-full h-[10%] grid place-content-center ">
				<CSVLink filename={"test.csv"} data={csvData}>
					<button
						onMouseEnter={() => setHover(true)}
						onMouseLeave={() => setHover(false)}
						className={`overflow-hidden ${hover ? "w-[9.5rem]" : "w-[3rem] hover:scale-110"} p-2 h-14 m-2 rounded-lg bg-light active:scale-90 duration-75 ease-in-out flex items-center`}
					>
						<img src={download} alt="" srcSet="" className="w-8 h-8 " />

						<p className={`duration-300 whitespace-nowrap w-fit h-fit ${hover ? "" : "translate-x-[-150%]"}`}>Download Csv</p>
					</button>
				</CSVLink>
			</div>
		</section>
	);
};

export default Middle;
