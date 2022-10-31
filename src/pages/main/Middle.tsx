import { v4 as uuid } from 'uuid';

import Calendar from './Calender';
import Title from './Title';
import Download from './Download';

import data from "@assets/data.json"

const Middle = ({title, events}: any) => {
	const months = data.months


	return (
		<section className="relative flex flex-col w-full h-full overflow-hidden hover-fade">
			<section className="w-full h-16 p-3">
				<Title text={title} />
			</section>

			<section className="grid w-full h-full gap-4 p-8 overflow-hidden my-col-2 auto-rows-auto place-content-center justify-evenly duration-300 ease-in-out">
				{months.map(month => (
					<Calendar key={uuid()} events={events[month]} month={month} />
				))}
			</section>

			<div className="w-full h-[10%] grid place-content-center ">
				<Download />
			</div>
		</section>
	);
};
export default Middle;
