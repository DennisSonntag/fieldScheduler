import { useState } from 'react';

import Sport from './Sport';
import SideBtn from './SideBtn';
import Middle from './Middle';
import Left from './Left';
import Right from './Right';
import data from "@assets/data.json"

const Rugby = () => {
	// const [leftOpen, setLeftOpen] = useState(true);
	// const [rightOpen, setRightOpen] = useState(false);

	// const [leftOpen, setLeftOpen] = useState(false);
	// const [rightOpen, setRightOpen] = useState(true);

	const [leftOpen, setLeftOpen] = useState(true);
	const [rightOpen, setRightOpen] = useState(true);

	return (
		<Sport>
			<Left leftOpen={leftOpen} />

			<SideBtn setState={setLeftOpen} state={leftOpen} side={false} />

			<Middle title="Rugby Schedule" events={data.rugbyEvents}/>

			<SideBtn setState={setRightOpen} state={rightOpen} side />

			<Right rightOpen={rightOpen} />
		</Sport>
	);
};
export default Rugby;
