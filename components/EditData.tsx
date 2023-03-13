/* eslint-disable no-restricted-globals */

/* eslint-disable no-alert */

/* eslint-disable no-await-in-loop */

/* eslint-disable no-restricted-syntax */
import { useAtom } from 'jotai';
import Image from 'next/image';
import { SchoolDataAtom, SchoolType } from 'pages/main';
import PocketBase from 'pocketbase';
import { useState } from 'react';

import arrow1 from '@svg/arrow1.svg';
import remove from '@svg/remove.svg';

import Button from './Button';

const pb = new PocketBase('https://schedulerdatabase.fly.dev');

type SelectedDataType = {
	name: string;
	field: number;
};

const EditData = () => {
	const [schoolData, setSchoolData] = useAtom(SchoolDataAtom);
	const [selectedData, setSelectedData] = useState<SelectedDataType>();
	const [selected, setSelected] = useState(false);

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

			const index = schoolData.indexOf(school);
			setSchoolData(prev =>
				// Filter out the item with the matching index
				prev.filter((_value, i) => i !== index)
			);
		}
	};

	return (
		<div>
			{selected ? (
				<div>
					<Button onClick={() => setSelected(false)} className="absolute top-2 left-2">
						<Image src={arrow1} alt="Dark/Light mode toggle button" className="h-8 w-8" />
					</Button>
					<div className="my-border my-shadow absolute inset-0 m-auto h-fit w-fit rounded-md bg-main p-2">
						<div className="h-fit w-fit flex-col gap-2">
							<div>
								<label htmlFor="field">Has Field</label>
								<input value={String(selectedData?.field)} id="field" type="text" className="my-border my-shadow h-10 w-[5rem] rounded-sm" />
							</div>
							<div>
								<label htmlFor="div">Div</label>
								<input id="div" type="text" className="my-border my-shadow h-10 w-[5rem] rounded-sm" />
							</div>
							<div>
								<label htmlFor="name">Name</label>
								<input value={selectedData?.name} id="name" type="text" className="my-border my-shadow h-10 w-[5rem] rounded-sm" />
							</div>
						</div>
					</div>
					<Button text="Upload" className="absolute inset-x-0 mx-auto bottom-10 w-fit font-bold text-xl" />
				</div>
			) : (
				<div className="my-grid grid h-fit w-full gap-10 p-4">
					{schoolData.map(school => (
						<div className="w-full relative flex">
							<Button onClick={() => removeSchool(school)} className="w-fit h-fit">
								<Image className="h-3 w-3" src={remove} alt="remove icon" />
							</Button>
							<Button key={school.school_name} onClick={() => handleSelect(school.school_name, school.field)} className="w-full bg-main hover:bg-main-light relative">
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
