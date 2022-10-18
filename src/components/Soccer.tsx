import Btn from "./Btn";
import Calendar from "./Calender";
import { CSVLink } from "react-csv";
import Sport from "./Sport";

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

		<Sport>
			<img className="absolute inset-0 m-auto rounded-lg shadow-lg" src="https://media.giphy.com/media/dWa2rUaiahx1FB3jor/giphy.gif" alt="" srcSet="" />
		</Sport>
	)

}
export default Main