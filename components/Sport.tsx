import { FC } from 'react';

import Middle from './Middle';
import Left from './Left';

const Sport: FC<{ activePage: number }> = ({ activePage }) => (
	<main className="flex h-full w-full flex-row overflow-hidden">
		<Left />

		<Middle title={`${activePage === 0 ? 'Rugby' : 'Soccer'} Schedule`} />
	</main>
);
export default Sport;
