import { SportType } from 'pages/main';
import { FC } from 'react';

import Left from './Left';
import Middle from './Middle';

type PropTypes = {
	title: string;
	sportType: SportType;
};

const Sport: FC<PropTypes> = ({ title, sportType }) => (
	<main className="flex h-full w-full flex-row overflow-hidden">
		<Left />

		<Middle title={`${title} Schedule`} sportType={sportType} />
	</main>
);
export default Sport;
