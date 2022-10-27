import { useContext, useState } from 'react';
import { CSVLink } from 'react-csv';

import download from '@svg/download.svg';
import { Theme } from '@components/App';

const Download = () => {
	const csvData = [['Home Team', 'Visitor Team', 'Start Date (MM/DD/YYYY)', 'Start Time (HH:MM AA)', 'Duration (minutes)', 'Details', 'Show Details', 'League Name', 'Practice Type (Shared or Full)', 'Schedule Name', 'Venue']];
	const [hover, setHover] = useState(false);

	const theme = useContext(Theme);

	return (
		<CSVLink filename="test.csv" data={csvData}>
			<button type="button" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className={`overflow-hidden ${hover ? 'w-[9.5rem]' : 'w-[3rem] hover:scale-110'} p-2 h-14 m-2 rounded-lg ${theme ? 'bg-dark' : 'bg-light'} active:scale-90 duration-75 ease-in-out flex items-center`}>
				<img src={download} alt="" srcSet="" className={`w-8 h-8 ${theme ? 'invert' : ''}`} />
				<p className={`duration-300 whitespace-nowrap w-fit h-fit ${theme ? 'text-white' : 'text-black'}  ${hover ? '' : 'translate-x-[-150%]'}`}>Download Csv</p>
			</button>
		</CSVLink>
	);
};
export default Download;
