import { FC } from 'react';

import Left from './Left';
import Middle from './Middle';

const Sport: FC<{ activePage: number }> = ({ activePage }) => (
	<main className="flex h-full w-full flex-row overflow-hidden">
		<Left />

		<Middle title={`${activePage === 0 ? 'Rugby' : 'Soccer'} Schedule`} />
	</main>
);
export default Sport;
