/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { Dispatch, SetStateAction, useContext, useRef } from 'react';
import { filterContext, scheduleGamesContext, schoolNameContext, teamTestInfoContext } from 'pages/main';
import PocketBase, { Record } from 'pocketbase';
// import { makeMatchPairings, matchFromDb, newTeamAlg, scheduleGames, separatePerTeam } from '@ts/matchUp';
import { TeamTestInfo, SchoolType } from 'pages/main';
import Filter from './Filter';
import FilterChip from './FilterChip';
import EditData from './EditData';
import { scheduleGames } from '@ts/matchUp';

const pb = new PocketBase('http://127.0.0.1:8090');

const TeamInfo = () => {
	const [gameData, setGameData] = useContext(scheduleGamesContext);
	const schoolData = useContext(schoolNameContext) as SchoolType[];
	const teamTestInfo = useContext(teamTestInfoContext) as TeamTestInfo;
	const schoolNames = schoolData.map(elm => elm.school_name.trim());
	const schoolIds = schoolData.map(elm => elm.id);
	const schoolInfo = schoolData.map(elm => {
		return {
			name: elm.school_name.trim(),
			id: elm.id,
		};
	});

	// const teamsTest = useContext(teamInfoContext);
	const filterData = useContext(filterContext);

	const [divSelect, setDivSelect] = filterData[0];
	const [schoolSelect, setSchoolSelect] = filterData[1];
	const [senioritySelect, setSenioritySelect] = filterData[2];
	const [genderSelect, setGenderSelect] = filterData[3];

	const teams = [
		{ name: 'Team 1', div: 1, 'sr/jr': 'sr' },
		{ name: 'Team 2', div: 1, 'sr/jr': 'sr' },
		{ name: 'Team 3', div: 1, 'sr/jr': 'sr' },
		{ name: 'Team 4', div: 1, 'sr/jr': 'sr' },
		{ name: 'Team 5', div: 1, 'sr/jr': 'sr' },
		{ name: 'Team 6', div: 1, 'sr/jr': 'sr' },
		{ name: 'Team 7', div: 1, 'sr/jr': 'sr' },
		{ name: 'Team 8', div: 1, 'sr/jr': 'sr' },
		{ name: 'Team 9', div: 1, 'sr/jr': 'sr' },
		{ name: 'Team 10', div: 1, 'sr/jr': 'sr' },
		{ name: 'Team 11', div: 1, 'sr/jr': 'sr' },
		{ name: 'Team 12', div: 1, 'sr/jr': 'sr' },
	];

	const divisions = ['Div 1', 'Div 2', 'Div 3'];
	const seniorities = ['Sr', 'Jr'];
	const gender = ['Girls', 'Boys'];

	const dialogRef = useRef(null);

	const handleClick = () => {
		const dialog = dialogRef.current as unknown as any;

		dialog.showModal();
	};

	const closeModal = () => {
		const dialog = dialogRef.current as unknown as any;

		dialog.close();
	};

	const getTeamsFromName = async (name: string): Promise<Record[]> =>
		pb.collection('teamsTest').getFullList(200 /* batch size */, {
			sort: '-created',
			filter: `school_name="${schoolInfo.filter(elm => elm.name === name)[0].id}"`,
		});

	const getTeamsFromType = async (teamType: number): Promise<Record[]> =>
		pb.collection('teamsTest').getFullList(200 /* batch size */, {
			sort: '-created',
			filter: `teamType=${teamType}`,
		});

	const getTeamsFromDiv = async (div: number): Promise<Record[][]> => {
		const test3 = await pb.collection('schools').getFullList(200 /* batch size */, {
			sort: '-created',
			filter: `div=${div}`,
		});
		const idList = test3.map(elm => elm.id);

		const divTeams = [];
		// eslint-disable-next-line no-restricted-syntax
		for (const ID of idList) {
			// eslint-disable-next-line no-await-in-loop
			const records = await pb.collection('teamsTest').getFullList(200 /* batch size */, {
				sort: '-created',
				filter: `school_name="${ID}"`,
			});
			divTeams.push(records);
		}
		return divTeams;
	};

	const getTeamsFromDivAndType = async (div: number, type: number): Promise<Record[][]> => {
		const test3 = await pb.collection('schools').getFullList(200 /* batch size */, {
			sort: '-created',
			filter: `div=${div}`,
		});

		const idList = test3.map(elm => elm.id);

		const divTeams = [];
		// eslint-disable-next-line no-restricted-syntax
		for (const ID of idList) {
			// eslint-disable-next-line no-await-in-loop
			const records = await pb.collection('teamsTest').getFullList(200 /* batch size */, {
				sort: '-created',
				filter: `school_name="${ID}" && teamType=${type}`,
			});
			divTeams.push(records);
		}
		return divTeams;
	};
	const nameFromSchoolId = (id: string): string => schoolInfo.filter(elm3 => elm3.id === id)[0].name;

	const teamIdToSchoolId = (teamId: string): string => teamTestInfo.filter(elm => elm.id === teamId)[0].school_id;

	const idToName = (id: string): string => nameFromSchoolId(teamIdToSchoolId(id));

	const idToType = (id: string): number => teamTestInfo.filter(elm => elm.id === id)[0].type;
	const schoolIdToDiv = (id: string): number => schoolData.filter(elm => elm.id === id)[0].div;

	const handleClickTest = async () => {
		const startDate = new Date('2023-3-1');
		const endDate = new Date('2023-6-30');
		const teamsPerSubdivision = [6, 12, 8, 4, 10, 6, 12, 8, 4, 10, 6, 12];
		const noGamesOnDates = ['2023-4-1'];
		const res = scheduleGames(teamsPerSubdivision, 12, true, noGamesOnDates, 6, 16, startDate, endDate);
		const gameDays = res.map(elm => elm.day);
		setGameData(gameDays);
	};

	return (
		// eslint-disable-next-line react/jsx-no-comment-textnodes
		<div className="relative flex h-full w-full flex-col gap-2">
			<dialog onClick={e => e.stopPropagation()} ref={dialogRef} className="my-border my-shadow absolute inset-0 m-auto h-[80%] w-[80%] rounded-xl bg-main backdrop:bg-black backdrop:opacity-80">
				<EditData close={closeModal} />
			</dialog>

			{/* <button title="Edit Team Data" onClick={handleClickTest} type="button" className="my-shadow my-border smooth-scale relative inset-x-0 mx-auto h-fit w-fit rounded-md bg-main p-3 font-bold text-invert hover:scale-110 active:scale-90">
				Test
			</button> */}

			<button title="Edit Team Data" onClick={handleClick} type="button" className="my-shadow my-border smooth-scale relative inset-x-0 mx-auto h-fit w-fit rounded-md bg-main p-3 font-bold text-invert hover:scale-110 active:scale-90">
				Edit Team data
			</button>

			<button title="Edit Team Data" onClick={handleClickTest} type="button" className="my-shadow my-border smooth-scale relative inset-x-0 mx-auto h-fit w-fit rounded-md bg-main p-3 font-bold text-invert hover:scale-110 active:scale-90">
				Calculate Schedule
			</button>
			<div className="my-col-3 grid h-fit w-full auto-rows-auto items-center justify-around gap-2">
				<Filter options={divisions} title="Div" selected={divSelect as string[]} setSelected={setDivSelect as Dispatch<SetStateAction<string[]>>} />
				<Filter scroll options={schoolNames} title="School" selected={schoolSelect as string[]} setSelected={setSchoolSelect as Dispatch<SetStateAction<string[]>>} />
				<Filter options={seniorities} title="Sr/Jr" selected={senioritySelect as string[]} setSelected={setSenioritySelect as Dispatch<SetStateAction<string[]>>} />
				<Filter options={gender} title="Gender" selected={genderSelect as string[]} setSelected={setGenderSelect as Dispatch<SetStateAction<string[]>>} />
			</div>

			<FilterChip selected={divSelect as string[]} />
			<FilterChip selected={schoolSelect as string[]} />
			<FilterChip selected={senioritySelect as string[]} />
			<FilterChip selected={genderSelect as string[]} />

			<div className=" z-0 grid h-auto grow grid-cols-3 gap-4 p-2">
				{teams.map(team => (
					<div key={team.name} className="smooth-scale no-move my-border my-shadow relative grid h-full w-full cursor-pointer place-content-center rounded-md bg-main text-center text-invert hover:scale-105 active:scale-90 ">
						<p className="h-fit w-fit text-center">{team.name}</p>
						<p className="h-fit w-fit text-center">Div {team.div}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default TeamInfo;
