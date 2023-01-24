import { CSVLink } from 'react-csv';

const Download = () => {
	const template = [['Home Team', 'Visitor Team', 'Start Date (MM/DD/YYYY)', 'Start Time (HH:MM AA)', 'Duration (minutes)', 'Details', 'Show Details', 'League Name', 'Practice Type (Shared or Full)', 'Schedule Name', 'Venue']];
	return (
		<CSVLink filename="schedule.csv" data={template}>
			<button type="button" className="my-border my-shadow group m-2 flex h-14 w-[3rem] items-center overflow-hidden rounded-lg bg-main  p-2 duration-75 ease-in-out hover:w-[10rem] hover:scale-110 active:scale-90">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="absolute h-8 w-8 fill-invert">
					<path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zM432 456c-13.3 0-24-10.7-24-24s10.7-24 24-24s24 10.7 24 24s-10.7 24-24 24z" />
				</svg>
				<p className="h-fit w-fit translate-x-[-110%] whitespace-nowrap font-bold text-invert  duration-300 group-hover:translate-x-[30%]">Download Csv</p>
			</button>
		</CSVLink>
	);
};
export default Download;
