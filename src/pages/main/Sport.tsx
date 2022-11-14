import { createContext, useState } from 'react';

import data from '@assets/data.json';
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
			<main className="absolute bottom-0 flex h-[92%] w-full flex-row overflow-hidden ">
				{/* <img className="absolute inset-0 m-auto rounded-lg shadow-lg" src={gif} alt="" srcSet="" /> */}
				<Left leftOpen={leftOpen} />

				<SideBtn setState={setLeftOpen} state={leftOpen} side={false} />

				<Middle title={`${arrayIsEqual(activePage, [true, false, false]) ? 'Rugby' : 'Soccer'} Schedule`} />

				<SideBtn setState={setRightOpen} state={rightOpen} side />

				<Right rightOpen={rightOpen} />
			</main>
		</activePageContext.Provider>
	);
};
export default Sport;
