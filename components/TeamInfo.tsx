import { useContext, useState } from 'react';

import FilterChip from './FilterChip';
import Filter from './Filter';
import { schoolNameContext } from 'pages/main';
import PocketBase from 'pocketbase';
import { calculate } from '@ts/calculate';

const pb = new PocketBase('http://127.0.0.1:8090');

const TeamInfo = () => {
	const schools = useContext(schoolNameContext);

	const [divSelect, setDivSelect] = useState<string[]>([]);
	const [schoolSelect, setSchoolSelect] = useState<string[]>([]);
	const [senioritySelect, setSenioritySelect] = useState<string[]>([]);

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

	const names = [
		'william-taylor-and-george-wood-learning-centre',
		'william-aberhart-high-school ',
		'st-francis-high-school ',
		'bowness-high-school ',
		'john-g-diefenbaker-high-school ',
		'crescent-heights-high-school ',
		'dr-gordon-townsend-school ',
		'christine-meikle-school ',
		'louise-dean-school ',
		'james-fowler-high-school ',
		'robert-thirsk-high-school ',
		'sir-winston-churchill-high-school ',
		'nelson-mandela-high-school ',
		'lester-b-pearson-high-school ',
		'notre-dame-high-school ',
		'bishop-mcnally-high-school ',
		'ernest-manning-high-school ',
		'central-memorial-high-school ',
		'william-roper-hull-school ',
		'henry-wise-wood-high-school ',
		'our-lady-of-lourdes-high-school ',
		'bishop-carroll-high-school ',
		'national-sport-school ',
		'st-marys-high-school ',
		'dr-ep-scarlett-high-school ',
		'western-canada-high-school ',
		'bishop-grandin-high-school ',
		'st-anthony-school ',
		'st-anne-academic-centre ',
		'jack-james-high-school ',
		'centennial-high-school ',
		'lord-beaverbrook-high-school ',
		'father-lacombe-high-school ',
		'all-saints-high-school ',
		'bishop-obyrne-high-school ',
		'forest-lawn-high-school ',
	];

	const divisions = ['Div 1', 'Div 2', 'Div 3'];
	const seniorities = ['Sr', 'Jr'];

	const uploadData = async () => {
		calculate()
	};

	return (
		<>
			<div className="my-col-3 grid h-fit w-full auto-rows-auto items-center justify-around gap-2">
				<Filter options={divisions} title="Div n" selected={divSelect} setSelected={setDivSelect} />
				<Filter scroll options={schools} title="School" selected={schoolSelect} setSelected={setSchoolSelect} />
				<Filter options={seniorities} title="Sr/Jr" selected={senioritySelect} setSelected={setSenioritySelect} />
			</div>

			<FilterChip selected={divSelect} />
			<FilterChip selected={schoolSelect} />
			<FilterChip selected={senioritySelect} />

			<button type="button" onClick={uploadData}>
				Upload Data
			</button>

			<div className=" z-0 grid h-auto grow grid-cols-3 gap-4 p-2">
				{teams.map(team => (
					<div key={team.name} className="smooth no-move relative grid h-full w-full cursor-pointer place-content-center rounded-md bg-base text-center text-stark shadow-xl hover:scale-105 active:scale-90 ">
						<p className="h-fit w-fit text-center">{team.name}</p>
						<p className="h-fit w-fit text-center">Div {team.div}</p>
					</div>
				))}
			</div>
		</>
	);
};
export default TeamInfo;
