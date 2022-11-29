import { useState } from 'react';

import DateInfo from './DateInfo';
import TeamInfo from './TeamInfo';

const Left = ({ leftOpen }: any) => {
	const [active, setActive] = useState(true);

	return (
		<section className={` ${leftOpen ? 'w-1/2' : 'w-0 translate-x-[-100%]'} hover-fade relative flex h-full flex-col  overflow-hidden  rounded-bl-xl `}>
			<div className="relative h-16 w-full gap-2 ">
				<div className={`w-fit h-fit absolute inset-0 m-auto flex ${active ? 'bg-mid' : 'bg-base'} rounded-md`}>
					<button type="button" onClick={() => setActive(true)} className={`m-auto h-fit w-fit rounded-md bg-base py-2 px-4 font-semibold shadow-md duration-75 ease-in-out hover:px-6 active:px-3 ${active ? "bg-base" : "bg-mid"}`}>
						Team Info
					</button>
					<button type="button" onClick={() => setActive(false)} className={`m-auto h-fit w-fit rounded-md bg-base py-2 px-4 font-semibold shadow-md duration-75 ease-in-out hover:px-6 active:px-3 ${!active ? "bg-base" : "bg-mid"}`}>
						Date Info
					</button>
				</div>
			</div>
			{active ?  <TeamInfo /> : <DateInfo />}
		</section>
	);
};
export default Left;
