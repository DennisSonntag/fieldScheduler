import { FC, useState } from 'react';

import SideBtn from './SideBtn';
import Middle from './Middle';
import Left from './LeftPane';

const Sport: FC<{ activePage: number }> = ({ activePage }) => {
	const [leftOpen, setLeftOpen] = useState(true);
	return (
		<main className="flex h-full w-full flex-row overflow-hidden">
			<Left leftOpen={leftOpen} />

			<SideBtn setLeftOpen={setLeftOpen} leftOpen={leftOpen} />

			<Middle title={`${activePage === 0 ? 'Rugby' : 'Soccer'} Schedule`} />
		</main>
	);
};
export default Sport;
