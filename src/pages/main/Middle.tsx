import { v4 as uuid } from 'uuid';
import { useState } from 'react';

import data from '@assets/data.json';

import seasonIcon from '@svg/year.svg';
import monthIcon from '@svg/calendar.svg';
import weekIcon from '@svg/week.svg';
import dayIcon from '@svg/day.svg';

import Calendar from './Calender';
import Title from './Title';
import Download from './Download';
import ViewBtn from './ViewBtn';

const Middle = ({ title, events }: any) => {
	const { months } = data.rugby;

	const [active, setActive] = useState(1);

	const setIcon = () => {
		if (active === 4) {
			setActive(0);
		}
		setActive(prev => (prev += 1));
	};

	return (
		<section className="relative flex flex-col w-full h-full overflow-hidden hover-fade">
			<section className="w-full h-16 p-3">
				<Title text={title} />
			</section>

			<section className="grid w-full h-full gap-4 p-8 overflow-hidden my-col-2 auto-rows-auto place-content-center justify-evenly duration-300 ease-in-out relative">
				{active === 1 ? (
					<>
						<ViewBtn setIcon={setIcon} icon={seasonIcon} text="Season" />
						{months.map(month => (
							<Calendar key={uuid()} events={events[month]} month={month} />
						))}
					</>
				) : null}
				{active === 2 ? (
					<>
						<ViewBtn setIcon={setIcon} icon={monthIcon} text="Month" />
						<Calendar key={uuid()} events={events[2]} month={2} />
					</>
				) : null}
				{active === 3 ? <ViewBtn setIcon={setIcon} icon={weekIcon} text="Week" /> : null}
				{active === 4 ? <ViewBtn setIcon={setIcon} icon={dayIcon} text="Day" /> : null}
			</section>

			<div className="w-full h-[10%] grid place-content-center ">
				<Download />
			</div>
		</section>
	);
};
export default Middle;
