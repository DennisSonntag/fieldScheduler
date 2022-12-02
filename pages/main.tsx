import { createContext, useState } from 'react';

import Link from 'next/link';
import SportSelect from '@components/SportSelect';
import Sport from '@components/Sport';
import Compare from '@components/Compare';
import App from '@components/App';
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

export const schoolNameContext = createContext<string[]>([]);

type PropType = {
	schoolNames: string[];
};

const Main = ({ schoolNames }: PropType) => {
	const [activePage, setActivePage] = useState([true, false, false]);
	const [rugbyActive, soccerActive, compareActive] = activePage;

	const setRugby = () => setActivePage([true, false, false]);

	const setSoccer = () => setActivePage([false, true, false]);

	const setCompare = () => setActivePage([false, false, true]);

	return (
		<schoolNameContext.Provider value={schoolNames}>
			<App title="Scheduler">
				<div className="flex h-screen w-screen flex-col ">
					<div className="h-16 w-screen shrink-0 ">
						<Link href="/">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="absolute top-2 right-2 h-6 w-6 fill-base hover:scale-125 active:scale-90">
								<path d="M160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96C43 32 0 75 0 128V384c0 53 43 96 96 96h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H96c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32h64zM504.5 273.4c4.8-4.5 7.5-10.8 7.5-17.4s-2.7-12.9-7.5-17.4l-144-136c-7-6.6-17.2-8.4-26-4.6s-14.5 12.5-14.5 22v72H192c-17.7 0-32 14.3-32 32l0 64c0 17.7 14.3 32 32 32H320v72c0 9.6 5.7 18.2 14.5 22s19 2 26-4.6l144-136z" />
							</svg>
						</Link>

						<nav className="absolute inset-x-0 top-0 z-50 m-2 mx-auto box-border flex h-fit w-fit gap-2">
							<SportSelect sport="Rugby" activePage={rugbyActive} setActivePage={setRugby} />
							<SportSelect sport="Soccer" activePage={soccerActive} setActivePage={setSoccer} />
							<button title="Compare Schedules" onClick={setCompare} type="button" className={`${compareActive ? 'bg-base' : 'bg-mid'} smooth absolute inset-x-0 top-4 mx-auto h-10 w-10 select-none rounded-full border-[0.3rem] border-top outline-none duration-100 ease-in-out hover:scale-110 active:scale-90`}>
								<svg className={`inset-0 m-auto h-4 w-4 ${compareActive ? 'fill-stark' : 'fill-invert'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
									<path d="M422.6 278.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L434.7 176H64c-17.7 0-32-14.3-32-32s14.3-32 32-32H434.7L377.4 54.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l112 112c12.5 12.5 12.5 32.8 0 45.3l-112 112zm-269.3 224l-112-112c-12.5-12.5-12.5-32.8 0-45.3l112-112c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3L141.3 336H512c17.7 0 32 14.3 32 32s-14.3 32-32 32H141.3l57.4 57.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0z" />
								</svg>
							</button>
						</nav>
					</div>
					<div className="h-auto w-screen grow">
						{rugbyActive ? <Sport activePage={activePage} /> : null}
						{soccerActive ? <Sport activePage={activePage} /> : null}
						{compareActive ? <Compare /> : null}
					</div>
				</div>
			</App>
		</schoolNameContext.Provider>
	);
};
export default Main;

export async function getServerSideProps() {
	const records = await pb.collection('schools').getFullList(200 /* batch size */, {
		sort: '-created',
	});
	const namesRaw = records.map(elm => elm.school_name);

	return {
		props: { schoolNames: namesRaw},
	};
}
