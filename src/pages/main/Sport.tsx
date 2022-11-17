import { createContext, useState } from 'react';

import { arrayIsEqual } from 'src/ts/helperFuncs';
import SideBtn from './SideBtn';
import Middle from './Middle';
import Left from './Left';
import Right from './Right';

export const activePageContext = createContext(null);

const Sport = ({ activePage }: any) => {
	const [leftOpen, setLeftOpen] = useState(true);
	const [rightOpen, setRightOpen] = useState(true);

	return (
		<activePageContext.Provider value={activePage}>
			<main className="absolute flex h-full w-full flex-row overflow-hidden">
				<Left leftOpen={leftOpen} />

				<SideBtn setState={setLeftOpen} state={leftOpen} side={false} />

				<Middle title={`${arrayIsEqual(activePage, [true, false, false]) ? 'Rugby' : 'Soccer'} Schedule`} />
			</main>
		</activePageContext.Provider>
	);
};
export default Sport;
