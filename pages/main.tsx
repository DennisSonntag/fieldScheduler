import { Provider as JotaiProvider, atom, createStore } from 'jotai';
import { getSession, signOut } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import Link from 'next/link';
import { AltFieldAvailability, AltFieldType, DivType, FieldType, Game, TeamType } from 'pages/api/calculate';
import PocketBase from 'pocketbase';
import { FC, useState } from 'react';

import App from '@components/App';
import Button from '@components/Button';
import Compare from '@components/Compare';
import Sport from '@components/Sport';
import SportSelect from '@components/SportSelect';

type PossibleDataType = { [key: string]: string };
export const possibleData: PossibleDataType = {
	CEN: 'Centennial',
	ND: 'Notre Dame',
	SF: 'St.Francis',
	WC: 'Western Canada',
	EM: 'Ernest Manning',
	AS: 'All Saints',
	BOW: 'Bowness',
	CH: 'Crescent Heights',
	HWW: 'Henry Wise Wood',
	OLR: 'Our Lady Of The Rockies',
	JC: 'Joane Cardinal Schubert- TBD',
	JGD: 'John G.Diefenbaker',
	SWC: 'Sir Winston Churchill',
	WA: 'William Aberhart',
	BC: 'Bishop Carroll',
	BM: 'Bishop McNally',
	CM: 'Central Memorial',
	FL: 'Forest Lawn',
	LBP: 'Lester B.Pearson',
	NM: 'Nelson Mandela',
	RT: 'Robert Thirsk',
	SM: 'St.Mary’s',
	LB: 'Lord Beaverbrook',
	BOB: 'Bishop O’Byrne',
	EPS: 'Dr.E.P.Scarlett',
	QE: 'Queen Elizabeth',
};

const pb = new PocketBase('https://schedulerdatabase.fly.dev');

export type SchoolType = {
	school_name: string;
	id: string;
	code: string;
	field: FieldType;
	alt_field: AltFieldType;
};

export type TeamPropType = {
	school: string;
	relationId: string;
	type: TeamType;
	field: FieldType;
	alt_field: AltFieldType;
	id: string;
	div: DivType;
};

type PropType = {
	schoolData: SchoolType[];
	teamInfo: TeamPropType[];
};

export const SportTypes = ['rugby', 'compare', 'soccer'] as const;
export type SportType = (typeof SportTypes)[number];

export const store = createStore();

export const RefNumAtom = atom<number>(8);
export const AltFieldAvailabilityAtom = atom<AltFieldAvailability>({} as AltFieldAvailability);
export const SchoolDataAtom = atom<SchoolType[]>([]);
export const TeamInfoAtom = atom<TeamPropType[]>([]);
export const RugbyScheduleAtom = atom<Game[]>([]);
export const SoccerScheduleAtom = atom<Game[]>([]);

export const SeniorityAtom = atom<string[]>([]);
export const SchoolAtom = atom<string[]>([]);
export const DivAtom = atom<string[]>([]);
export const GenderAtom = atom<string[]>([]);
export const FieldAtom = atom<string[]>([]);
export const AltAtom = atom<string[]>([]);
export const StartEndDateAtom = atom<Date[]>([new Date(2023, 2, 0), new Date(2023, 5, 31)]);

const Main: FC<PropType> = ({ schoolData, teamInfo }) => {
	const [sportType, setSportType] = useState<SportType>('rugby');

	const logout = () => {
		signOut();
		pb.authStore.clear();
	};

	store.set(SchoolDataAtom, schoolData);
	store.set(TeamInfoAtom, teamInfo);

	return (
		<ThemeProvider>
			<JotaiProvider store={store}>
				<App title="Scheduler">
					<div className="flex h-screen w-screen flex-col">
						<div className="h-16 w-screen shrink-0 ">
							<Link href="/">
								<Button onClick={logout} className="absolute top-2 right-2 w-fit h-fit">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="h-6 w-6 fill-stark ">
										<path d="M160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96C43 32 0 75 0 128V384c0 53 43 96 96 96h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H96c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32h64zM504.5 273.4c4.8-4.5 7.5-10.8 7.5-17.4s-2.7-12.9-7.5-17.4l-144-136c-7-6.6-17.2-8.4-26-4.6s-14.5 12.5-14.5 22v72H192c-17.7 0-32 14.3-32 32l0 64c0 17.7 14.3 32 32 32H320v72c0 9.6 5.7 18.2 14.5 22s19 2 26-4.6l144-136z" />
									</svg>
								</Button>
							</Link>
							<nav className="absolute inset-x-0 top-0 z-50 m-2 mx-auto box-border flex h-fit w-fit gap-2">
								<SportSelect sport="Rugby" activePage={sportType === 'rugby'} setActive={() => setSportType('rugby')} />
								<Button title="Compare Schedules" onClick={() => setSportType('compare')} className={`${sportType === 'compare' ? 'bg-main hover:bg-main-light' : 'bg-accent'} relative mx-auto h-10 w-10`}>
									<svg className={`inset-0 m-auto h-4 w-4 ${sportType === 'compare' ? 'fill-invert' : 'fill-stark'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
										<path d="M422.6 278.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L434.7 176H64c-17.7 0-32-14.3-32-32s14.3-32 32-32H434.7L377.4 54.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l112 112c12.5 12.5 12.5 32.8 0 45.3l-112 112zm-269.3 224l-112-112c-12.5-12.5-12.5-32.8 0-45.3l112-112c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3L141.3 336H512c17.7 0 32 14.3 32 32s-14.3 32-32 32H141.3l57.4 57.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0z" />
									</svg>
								</Button>
								<SportSelect sport="Soccer" activePage={sportType === 'soccer'} setActive={() => setSportType('soccer')} />
							</nav>
						</div>
						<div className="h-auto w-screen grow">{sportType === 'compare' ? <Compare /> : <Sport title={sportType} sportType={sportType} />}</div>
					</div>
				</App>
			</JotaiProvider>
		</ThemeProvider>
	);
};
export default Main;

export const getServerSideProps = async (context: any) => {
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

	const schoolData = records.map(elm => ({ school_name: elm.school_name, code: elm.school_code, id: elm.id, field: elm.has_field, alt_field: elm.alt_field }));

	const records2 = await pb.collection('teams').getFullList(200 /* batch size */, {
		sort: '-created',
	});

	const teamRaw = records2.map(elm => ({
		school: schoolData.filter(elm2 => elm2.id === elm.school)[0].school_name,
		relationId: schoolData.filter(elm2 => elm2.id === elm.school)[0].id,
		type: elm.team_type,
		field: schoolData.filter(elm2 => elm2.id === elm.school)[0].field,
		alt_field: schoolData.filter(elm2 => elm2.id === elm.school)[0].alt_field,
		id: elm.id,
		div: elm.div,
	}));

	return {
		props: { schoolData, teamInfo: teamRaw },
	};
};
