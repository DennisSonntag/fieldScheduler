/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { Dispatch, SetStateAction, useContext, useRef } from 'react';
import { filterContext, schoolNameContext, teamTestInfoContext } from 'pages/main';
import PocketBase, { Record } from 'pocketbase';
import Filter from './Filter';
import FilterChip from './FilterChip';
import { matchFromDb } from '@ts/matchUp';

const pb = new PocketBase('http://127.0.0.1:8090');

const TeamInfo = () => {
	const schoolData = useContext(schoolNameContext);
	const teamTestInfo = useContext(teamTestInfoContext);
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
	const teamIdToSchoolId = (teamId: string): string => {};

	const handleClickTest = async () => {
		// const range = (x: number, y: number): number[] => (x > y ? [] : [x, ...range(x + 1, y)]);

		const test = await getTeamsFromDivAndType(2, 1);
		const match = matchFromDb(test.flat().map(elm => elm.id));

		// const namedMatches = match.map(elm => elm.map(elm2 => nameFromId(elm2)));

		// 2ieh5qsw506xilw
		// forest-lawn-high-school

		// ['ac74tdm4z1yf45i', '8fkbp7yntij3v6g', 'qzde3dea1szq4dm', 'yyvwjsmpvsyc8jt', 'ypod1emnv0q69pr', 'g11byipov6g1r0h']
		// ['teni7gn16j1qf3f', '4z1gwwqxz7klm3y', 'yyvwjsmpvsyc8jt', 'g11byipov6g1r0h', 'qjcislwle0s1bwq', 'msfolhhss5mtlmk']
		// ['msfolhhss5mtlmk', 'ac74tdm4z1yf45i', '4z1gwwqxz7klm3y', 'ypod1emnv0q69pr', '7rt2y03cpyb69fz', 'bqdr8u5ar1mtb8p']
		// ['bqdr8u5ar1mtb8p', 'teni7gn16j1qf3f', '8fkbp7yntij3v6g', '4z1gwwqxz7klm3y', 'g11byipov6g1r0h', 'qjcislwle0s1bwq']
		// ['qjcislwle0s1bwq', 'msfolhhss5mtlmk', 'ac74tdm4z1yf45i', 'qzde3dea1szq4dm', '4z1gwwqxz7klm3y', '7rt2y03cpyb69fz']
		// ['7rt2y03cpyb69fz', 'bqdr8u5ar1mtb8p', 'teni7gn16j1qf3f', '8fkbp7yntij3v6g', 'yyvwjsmpvsyc8jt', '4z1gwwqxz7klm3y']
		// ['g11byipov6g1r0h', 'qjcislwle0s1bwq', 'msfolhhss5mtlmk', 'ac74tdm4z1yf45i', 'qzde3dea1szq4dm', 'ypod1emnv0q69pr']
		// ['ypod1emnv0q69pr', '7rt2y03cpyb69fz', 'bqdr8u5ar1mtb8p', 'teni7gn16j1qf3f', '8fkbp7yntij3v6g', 'yyvwjsmpvsyc8jt']
		// ['yyvwjsmpvsyc8jt', 'g11byipov6g1r0h', 'qjcislwle0s1bwq', 'msfolhhss5mtlmk', 'ac74tdm4z1yf45i', 'qzde3dea1szq4dm']
		// ['qzde3dea1szq4dm', 'ypod1emnv0q69pr', '7rt2y03cpyb69fz', 'bqdr8u5ar1mtb8p', 'teni7gn16j1qf3f', '8fkbp7yntij3v6g']
		// ['8fkbp7yntij3v6g', 'yyvwjsmpvsyc8jt', 'g11byipov6g1r0h', 'qjcislwle0s1bwq', 'msfolhhss5mtlmk', 'ac74tdm4z1yf45i']
		// ['4z1gwwqxz7klm3y', 'qzde3dea1szq4dm', 'ypod1emnv0q69pr', '7rt2y03cpyb69fz', 'bqdr8u5ar1mtb8p', 'teni7gn16j1qf3f']

		console.log(nameFromSchoolId('ac74tdm4z1yf45i'));
	};

	return (
		<div className="relative flex h-full w-full flex-col gap-2">
			<dialog ref={dialogRef} className="my-blur my-border my-shadow absolute inset-0 m-auto h-[80%] w-[80%] rounded-xl bg-main backdrop:bg-black backdrop:opacity-80">
				<h1 className=" my-shadow my-border absolute inset-x-0 top-4 mx-auto h-fit w-fit rounded-md bg-accent p-3 text-xl font-bold text-stark">Add/Edit Team data</h1>
				<button type="button" onClick={closeModal} className="smooth-scale my-shadow my-border absolute top-4 right-4 h-fit w-fit rounded-md bg-accent hover:scale-110 active:scale-90">
					<svg className="h-10 w-10 fill-stark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
						<path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
					</svg>
				</button>
			</dialog>
			{/* <button title="Edit Team Data" onClick={handleClickTest} type="button" className="my-shadow my-border smooth-scale relative inset-x-0 mx-auto h-fit w-fit rounded-md bg-main p-3 font-bold text-invert hover:scale-110 active:scale-90">
				Test
			</button> */}
			<button title="Edit Team Data" onClick={handleClick} type="button" className="my-shadow my-border smooth-scale relative inset-x-0 mx-auto h-fit w-fit rounded-md bg-main p-3 font-bold text-invert hover:scale-110 active:scale-90">
				Edit Team data
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
