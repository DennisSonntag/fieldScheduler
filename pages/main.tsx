import { createContext, Dispatch, SetStateAction, useState } from 'react';

import SportSelect from '@components/SportSelect';
import Compare from '@components/Compare';
import Sport from '@components/Sport';
import PocketBase from 'pocketbase';
import App from '@components/App';
import Link from 'next/link';
import { getSession, signOut } from 'next-auth/react';

const pb = new PocketBase('http://127.0.0.1:8090');

// eslint-disable-next-line @typescript-eslint/comma-dangle
export type TeamType = [
	{
		srGames: number[];
		jrGames: number[];
		team_color: string;
		school: string;
	}
];

export type SchoolType = {
	school_name: string;
	id: string;
};

type PropType = {
	schoolData: SchoolType[];
	teamInfo: TeamType;
};

export const activePageContext = createContext<number>(0);
export const schoolNameContext = createContext<SchoolType[]>([]);
export const teamInfoContext = createContext<any[]>([]);

export const filterContext = createContext<(string[] | Dispatch<SetStateAction<string[]>>)[][]>([[]]);

const Main = ({ schoolData: schoolNames, teamInfo }: PropType) => {
	const [activePage, setActivePage] = useState(0);
	const compareActive = activePage === 2;
	const soccerActive = activePage === 1;
	const rugbyActive = activePage === 0;

	const [senioritySelect, setSenioritySelect] = useState<string[]>([]);
	const [schoolSelect, setSchoolSelect] = useState<string[]>([]);
	const [divSelect, setDivSelect] = useState<string[]>([]);
	const [sexSelect, setSexSelect] = useState<string[]>([]);

	// eslint-disable-next-line react/jsx-no-constructed-context-values
	const filterData = [
		[senioritySelect, setSenioritySelect],
		[schoolSelect, setSchoolSelect],
		[divSelect, setDivSelect],
		[sexSelect, setSexSelect],
	];

	const logout = () => {
		signOut();
		pb.authStore.clear();
	};

	return (
		<schoolNameContext.Provider value={schoolNames}>
			<teamInfoContext.Provider value={teamInfo}>
				<activePageContext.Provider value={activePage}>
					<filterContext.Provider value={filterData}>
						<App title="Scheduler">
							<div className="flex h-screen w-screen flex-col ">
								<div className="h-16 w-screen shrink-0 ">
									<Link href="/" onClick={logout} className="my-border my-shadow smooth-scale absolute top-2 right-2 h-fit w-fit rounded-md bg-accent p-2 hover:scale-110 active:scale-90">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="h-6 w-6 fill-stark ">
											<path d="M160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96C43 32 0 75 0 128V384c0 53 43 96 96 96h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H96c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32h64zM504.5 273.4c4.8-4.5 7.5-10.8 7.5-17.4s-2.7-12.9-7.5-17.4l-144-136c-7-6.6-17.2-8.4-26-4.6s-14.5 12.5-14.5 22v72H192c-17.7 0-32 14.3-32 32l0 64c0 17.7 14.3 32 32 32H320v72c0 9.6 5.7 18.2 14.5 22s19 2 26-4.6l144-136z" />
										</svg>
									</Link>
									<nav className="absolute inset-x-0 top-0 z-50 m-2 mx-auto box-border flex h-fit w-fit gap-2">
										<SportSelect sport="Rugby" activePage={rugbyActive} setActivePage={() => setActivePage(0)} />
										<button title="Compare Schedules" onClick={() => setActivePage(2)} type="button" className={`${compareActive ? 'bg-main' : 'bg-accent'} smooth my-border   my-shadow relative mx-auto h-10 w-10 select-none rounded-md duration-100 ease-in-out hover:scale-110 active:scale-90`}>
											<svg className={`inset-0 m-auto h-4 w-4 ${compareActive ? 'fill-invert' : 'fill-stark'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
												<path d="M422.6 278.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L434.7 176H64c-17.7 0-32-14.3-32-32s14.3-32 32-32H434.7L377.4 54.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l112 112c12.5 12.5 12.5 32.8 0 45.3l-112 112zm-269.3 224l-112-112c-12.5-12.5-12.5-32.8 0-45.3l112-112c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3L141.3 336H512c17.7 0 32 14.3 32 32s-14.3 32-32 32H141.3l57.4 57.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0z" />
											</svg>
										</button>
										<SportSelect sport="Soccer" activePage={soccerActive} setActivePage={() => setActivePage(1)} />
									</nav>
								</div>
								<div className="h-auto w-screen grow">
									{rugbyActive ? <Sport activePage={activePage} /> : null}
									{soccerActive ? <Sport activePage={activePage} /> : null}
									{compareActive ? <Compare /> : null}
								</div>
							</div>
						</App>
					</filterContext.Provider>
				</activePageContext.Provider>
			</teamInfoContext.Provider>
		</schoolNameContext.Provider>
	);
};
export default Main;

export async function getServerSideProps(context: any) {
	const session = await getSession(context);
	if (!session) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}

	const records = await pb.collection('schools').getFullList(200 /* batch size */, {
		sort: '-created',
	});

	const schoolData = records.map(elm => ({ school_name: elm.school_name, id: elm.id }));

	const records2 = await pb.collection('teams').getFullList(200 /* batch size */, {
		sort: '-created',
	});

	const teamsRaw = records2.map(elm => ({
		school: elm.school_id,
		srGames: elm.srGames,
		jrGames: elm.jrGames,
		team_color: elm.team_color,
	}));

	return {
		props: { schoolData, teamInfo: teamsRaw },
	};
}
