/* eslint-disable import/no-cycle */
import { createContext, useState } from 'react';

import arrayIsEqual from '@ts/helperFuncs';
import SideBtn from './SideBtn';
import Middle from './Middle';
import Left from './LeftPane';

export const activePageContext = createContext<boolean[]>([]);

type PropType = {
	activePage: boolean[];
};

const Sport = ({ activePage }: PropType) => {
	const [leftOpen, setLeftOpen] = useState(true);

	return (
		<activePageContext.Provider value={activePage}>
			<main className="flex h-full w-full flex-row overflow-hidden">
				<Left leftOpen={leftOpen} />

				<SideBtn setLeftOpen={setLeftOpen} leftOpen={leftOpen} />

				<Middle title={`${arrayIsEqual(activePage, [true, false, false]) ? 'Rugby' : 'Soccer'} Schedule`} />
			</main>
		</activePageContext.Provider>
	);
};
export default Sport;
