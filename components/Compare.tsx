import data from '@assets/data.json';

import Middle from './Middle';

const Compare = () => (
	<main className="absolute flex h-full w-full flex-row overflow-hidden">
		<Middle title="Rugby Schedule" events={data.rugby.events} />
		<Middle title="Soccer Schedule" events={data.soccer.events} />
	</main>
);

export default Compare;
