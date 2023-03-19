import { FC } from 'react';

import Left from './Left';
import Middle from './Middle';

type PropTypes = {
	activePage: number;
};

const Sport: FC<PropTypes> = ({ activePage }) => (
	<main className="flex h-full w-full flex-row overflow-hidden">
		<Left />

		<Middle title={`${activePage === 0 ? 'Rugby' : 'Soccer'} Schedule`} />
	</main>
);
export default Sport;
