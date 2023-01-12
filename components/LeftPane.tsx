import { FC, useState } from 'react';

import DateInfo from './DateInfo';
import TeamInfo from './TeamInfo';

const Left: FC<{ leftOpen: boolean }> = ({ leftOpen }) => {
	const [active, setActive] = useState(true);

	return (
		<section className={` ${leftOpen ? 'w-1/2' : 'w-0 translate-x-[-100%]'} hover-fade relative flex h-full flex-col  overflow-hidden  rounded-bl-xl `}>
			<div className="relative h-16 w-full gap-2 ">
				<div className="absolute inset-0 m-auto flex h-fit w-fit gap-2 rounded-md shadow-lg">
					<button type="button" onClick={() => setActive(true)} className={`${active ? 'text-invert' : 'text-stark'} my-border my-shadow my-shadow smooth-scale m-auto h-fit w-fit rounded-md bg-main py-2 px-4 font-semibold hover:px-6 active:px-3 ${active ? 'bg-main' : 'bg-accent'}`}>
						Team Info
					</button>
					<button type="button" onClick={() => setActive(false)} className={` ${!active ? 'text-invert' : 'text-stark'} my-border my-shadow my-shadow smooth-scale m-auto h-fit w-fit rounded-md bg-main py-2 px-4 font-semibold hover:px-6 active:px-3 ${!active ? 'bg-main' : 'bg-accent'}`}>
						Date Info
					</button>
				</div>
			</div>
			{active ? <TeamInfo /> : <DateInfo />}
		</section>
	);
};
export default Left;
