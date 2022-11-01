import { useState } from 'react';

import data from '@assets/data.json';
import Sport from './Sport';
import SideBtn from './SideBtn';
import Middle from './Middle';
import Left from './Left';
import Right from './Right';

const Rugby = () => {
	// const [leftOpen, setLeftOpen] = useState(true);
	// const [rightOpen, setRightOpen] = useState(false);

	// const [leftOpen, setLeftOpen] = useState(false);
	// const [rightOpen, setRightOpen] = useState(true);

	const [leftOpen, setLeftOpen] = useState(true);
	const [rightOpen, setRightOpen] = useState(true);

	const { events } = data.rugby;

	return (
		<Sport>
			<Left leftOpen={leftOpen} teams={data.rugby.teams} />

			<SideBtn setState={setLeftOpen} state={leftOpen} side={false} />

			<Middle title="Rugby Schedule" events={events} />

			<SideBtn setState={setRightOpen} state={rightOpen} side />

			<Right rightOpen={rightOpen} />
		</Sport>
	);
};
export default Rugby;
