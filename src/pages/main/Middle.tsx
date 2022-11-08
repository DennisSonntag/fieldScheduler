import { v4 as uuid } from 'uuid';
import { useState } from 'react';

import data from '@assets/data.json';

import seasonIcon from '@svg/year.svg';
import monthIcon from '@svg/calendar.svg';
import weekIcon from '@svg/week.svg';
import caret from '@svg/caret.svg';
import dayIcon from '@svg/day.svg';

import Calendar from './Calender';
import Title from './Title';
import Download from './Download';
import ViewBtn from './ViewBtn';
import WeekCaret from './WeekCaret';

const Middle = ({ title, events }: any) => {
	const { months } = data.rugby;

	const [active, setActive] = useState(1);

	const setIcon = () => {
		if (active === 4) {
			setActive(0);
		}
		setActive(prev => (prev += 1));
	};

	const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
	const [week, setWeek] = useState(8);
	const [month, setMonth] = useState(2);

	const incWeek = () => {
		if (week + 1 <= 52) {
			setWeek(prev => (prev += 1));
		}
	};

	const decWeek = () => {
		if (week - 1 >= 1) {
			setWeek(prev => (prev -= 1));
		}
	};

	const incMonth = () => {
		if (month + 1 <= 5) {
			setMonth(prev => (prev += 1));
		}
	};

	const decMonth = () => {
		if (month - 1 >= 2) {
			setMonth(prev => (prev -= 1));
		}
	};

	return (
		<section className="hover-fade relative flex h-full w-full flex-col overflow-hidden">
			<section className="h-16 w-full p-3">
				<Title text={title} />
			</section>

			<section className="my-col-2 relative grid h-full w-full auto-rows-auto place-content-center justify-evenly gap-4 overflow-hidden p-8 duration-300 ease-in-out">
				{active === 1 ? (
					<>
						<ViewBtn setIcon={setIcon} icon={seasonIcon} text="Season" />
						{months.map(monthParam => (
							<Calendar key={uuid()} events={events[monthParam]} month={monthParam} hover />
						))}
					</>
				) : null}
				{active === 2 ? (
					<>
						<ViewBtn setIcon={setIcon} icon={monthIcon} text="Month" />
						<div className="absolute inset-0 m-auto flex h-fit w-[30rem] ">
							<button type="button" onClick={decMonth}>
								<img src={caret} alt="" className="smooth inv-1 h-16 w-16 rotate-90 hover:scale-110 active:scale-95" />
							</button>
							<Calendar key={uuid()} events={events[2]} month={month} />
							<button type="button" onClick={incMonth}>
								<img src={caret} alt="" className="smooth inv-1 h-16 w-16 rotate-[270deg] hover:scale-110 active:scale-95" />
							</button>
						</div>
					</>
				) : null}
				{active === 3 ? (
					<>
						<ViewBtn setIcon={setIcon} icon={weekIcon} text="Week" />
						<div className="relative flex h-48 w-full bg-mid">
							<h1 className="absolute inset-x-0 top-[-5rem] mx-auto h-fit w-fit text-[2rem] font-bold text-invert">Week {week}</h1>
							<WeekCaret func={incWeek} top />
							{weekDays.map(day => (
								<>
									<div className="flex h-fit w-full justify-around bg-bug">
										<p>{day}</p>
									</div>
									<div className="h-full w-auto border border-black bg-green-500" />
								</>
							))}
							<WeekCaret func={decWeek} />
						</div>
					</>
				) : null}
				{active === 4 ? <ViewBtn setIcon={setIcon} icon={dayIcon} text="Day" /> : null}
			</section>

			<div className="grid h-[10%] w-full place-content-center ">
				<Download />
			</div>
		</section>
	);
};
export default Middle;
