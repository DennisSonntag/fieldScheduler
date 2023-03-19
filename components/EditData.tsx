/* eslint-disable no-restricted-globals */

/* eslint-disable no-alert */

/* eslint-disable no-await-in-loop */

/* eslint-disable no-restricted-syntax */
import { Crypto } from '@peculiar/webcrypto';
import { useAtom } from 'jotai';
import Image from 'next/image';
import { SchoolDataAtom, SchoolType, TeamInfoAtom } from 'pages/main';
import PocketBase from 'pocketbase';
import { useState } from 'react';

import { TeamTypes } from '@ts/matchUp';

import arrow1 from '@svg/arrow1.svg';
import remove from '@svg/remove.svg';

import Button from './Button';

// const pb = new PocketBase('https://schedulerdatabase.fly.dev');
const pb = new PocketBase('http://127.0.0.1:8090');

type SelectedDataType = {
	name: string;
	field: number;
};

const crypto = new Crypto();

const EditData = () => {
	const [schoolData, setSchoolData] = useAtom(SchoolDataAtom);
	const teamInfo = useAtom(TeamInfoAtom)[0];
	const [selectedData, setSelectedData] = useState<SelectedDataType>();
	const [selected, setSelected] = useState(false);

	const teams = teamInfo.filter(elm => elm.school === selectedData?.name);

	const handleSelect = (name: string, field: number) => {
		setSelected(true);
		setSelectedData({
			name,
			field,
		});
	};

	const removeSchool = async (school: SchoolType) => {
		if (confirm(`are you sure you want to remove ${school.code}`)) {
			const teamRecord = await pb.collection('teams').getFullList(200, {
				sort: '-created',
				filter: `school="${school.id}"`,
			});
			for (const team of teamRecord) {
				await pb.collection('teams').delete(team.id);
			}
			await pb.collection('schools').delete(school.id);

			// const index = schoolData.indexOf(school);
			// setSchoolData(prev => prev.filter((_value, i) => i !== index));
			setSchoolData(prev => prev.filter(value => value !== school));
		}
	};

	return (
		<div>
			{selected ? (
				<div>
					<Button onClick={() => setSelected(false)} className="absolute top-2 left-2">
						<Image src={arrow1} alt="Dark/Light mode toggle button" className="h-8 w-8" />
					</Button>
					<div className="absolute inset-0 m-auto h-fit w-fit flex flex-col items-center gap-4">
						<div className="my-border my-shadow h-fit w-fit rounded-md bg-main p-2">
							<div className="h-fit w-fit flex flex-col gap-6">
								<div className="flex gap-4 items-center">
									<label htmlFor="field">Has Field</label>
									<input defaultValue={String(selectedData?.field)} id="field" type="text" className="my-border my-shadow h-10 w-fit rounded-sm" />
								</div>
								<div className="flex gap-4 items-center">
									<label htmlFor="div">Div</label>
									<input id="div" type="text" className="my-border my-shadow h-10 w-fit mr-auto rounded-sm" />
								</div>
								<div className="flex gap-4 items-center">
									<label htmlFor="name">Name</label>
									<input defaultValue={selectedData?.name} id="name" type="text" className="my-border my-shadow h-10 w-fit rounded-sm" />
								</div>
							</div>
						</div>
						<h2 className="font-extrabold text-2xl text-invert text-center">Teams</h2>
						<div className="flex gap-2">
							{teams.map(team => (
								<div key={crypto.randomUUID()} className="w-fit h-fit bg-main rounded-md my-border my-shadow p-2">
									<p>Div: {team.div}</p>
									<p>{TeamTypes[team.type - 1]}</p>
								</div>
							))}
						</div>
					</div>
					<Button text="Upload" className="absolute inset-x-0 mx-auto bottom-10 w-fit font-bold text-xl" />
				</div>
			) : (
				<div className="my-grid grid h-fit w-full gap-10 p-4">
					{schoolData.map(school => (
						<div key={crypto.randomUUID()} className="w-full relative flex">
							<Button onClick={() => removeSchool(school)} className="w-fit h-fit">
								<Image className="h-3 w-3" src={remove} alt="remove icon" />
							</Button>
							<Button onClick={() => handleSelect(school.school_name, school.field)} className="w-full bg-main hover:bg-main-light relative">
								<p className="font-bold">{school.school_name}</p>
								<p className={school.field ? 'text-green-500' : 'text-bug'}>Has field {String(school.field)}</p>
							</Button>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default EditData;
