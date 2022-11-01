import { useState } from 'react';

import data from '@assets/data.json';
import Sport from './Sport';
import SideBtn from './SideBtn';
import Middle from './Middle';
import Left from './Left';
import Right from './Right';

const Soccer = () => {
	const [leftOpen, setLeftOpen] = useState(true);
	const [rightOpen, setRightOpen] = useState(true);

	const { events } = data.soccer;

	return (
		<Sport>
			{/* <img className="absolute inset-0 m-auto rounded-lg shadow-lg" src={gif} alt="" srcSet="" /> */}
			<Left leftOpen={leftOpen} teams={data.soccer.teams} />

			<SideBtn setState={setLeftOpen} state={leftOpen} side={false} />

			<Middle title="Soccer Schedule" events={events} />

			<SideBtn setState={setRightOpen} state={rightOpen} side />

			<Right rightOpen={rightOpen} />
		</Sport>
	);
};
export default Soccer;
