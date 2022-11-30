import { createContext, useState } from 'react';

import { arrayIsEqual } from '@ts/helperFuncs';
import SideBtn from './SideBtn';
// eslint-disable-next-line import/no-cycle
import Middle from './Middle';
import Left from './Left';

export const activePageContext = createContext(null);

const Sport = ({ activePage }: any) => {
	const [leftOpen, setLeftOpen] = useState(true);

	return (
		<activePageContext.Provider value={activePage}>
			<main className="flex h-full w-full flex-row overflow-hidden">
				<Left leftOpen={leftOpen} />

				<SideBtn setState={setLeftOpen} state={leftOpen} side={false} />

				<Middle title={`${arrayIsEqual(activePage, [true, false, false]) ? 'Rugby' : 'Soccer'} Schedule`} />
			</main>
		</activePageContext.Provider>
	);
};
export default Sport;
