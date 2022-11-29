import data from '@assets/data.json';

import Sport from './Sport';
import Middle from './Middle';

const Compare = () => (
	<Sport>
		<Middle title="Rugby Schedule" events={data.rugby.events} />
		<Middle title="Soccer Schedule" events={data.soccer.events} />
	</Sport>
);

export default Compare;
