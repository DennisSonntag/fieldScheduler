/* eslint-disable no-restricted-globals */

/* eslint-disable no-alert */

/* eslint-disable no-await-in-loop */

/* eslint-disable no-restricted-syntax */
import { Crypto } from '@peculiar/webcrypto';
import { useAtom } from 'jotai';
import Image from 'next/image';
import { DivType, FieldType, FieldTypes, TeamType, TeamTypes } from 'pages/api/calculate';
import { SchoolDataAtom, SchoolType, TeamInfoAtom } from 'pages/main';
import PocketBase from 'pocketbase';
import { useEffect, useState } from 'react';
import { useImmer } from 'use-immer';

import arrow1 from '@svg/arrow1.svg';
import remove from '@svg/remove.svg';

import Button from './Button';

// const pb = new PocketBase('https://schedulerdatabase.fly.dev');
const pb = new PocketBase('http://127.0.0.1:8090');

type SelectedDataType = {
	name: string;
	field: number;
	code: string;
};

type TeamEditType = {
	id: string;
	div: DivType;
	teamType: TeamType;
};

const crypto = new Crypto();

const EditData = () => {
	const [schoolData, setSchoolData] = useAtom(SchoolDataAtom);
	const teamInfo = useAtom(TeamInfoAtom)[0];

	const [selectedData, setSelectedData] = useState<SelectedDataType>();
	const [selected, setSelected] = useState(false);

	const [teams, setTeams] = useImmer<TeamEditType[]>([]);

	const handleSelect = (name: string, field: number, code: string) => {
		setSelected(true);
		setSelectedData({
			name,
			field,
			code,
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

			setSchoolData(prev => prev.filter(value => value !== school));
		}
	};

	type SchoolEditDataType = {
		field: string;
		name: string;
		code: string;
	};
	const [schoolEditData, setSchoolEditData] = useImmer<SchoolEditDataType>({
		name: '',
		field: '',
		code: '',
	});

	useEffect(() => {
		setSchoolEditData((draft: SchoolEditDataType) => {
			draft.field = FieldTypes[Number(selectedData?.field) - 1];
			draft.name = selectedData?.name as string;
			draft.code = selectedData?.code as string;
		});

		setTeams(teamInfo.filter(elm => elm.school === selectedData?.name).map(elm => ({ div: elm.div as DivType, teamType: TeamTypes[elm.type - 1], id: elm.id })));
	}, [selectedData]);

	const handleUpload = async () => {
		// update school info
		const schoolId = schoolData.filter(elm => elm.school_name === selectedData?.name)[0].id;
		const schoolUploadData = {
			school_name: schoolEditData.name,
			school_code: schoolEditData.code,
			has_field: FieldTypes.indexOf(schoolEditData.field as FieldType) + 1,
		};

		await pb.collection('schools').update(schoolId, schoolUploadData);

		// update team info
		const teamIds = teamInfo.filter(elm => elm.school === selectedData?.name).map(elm => elm.id);

		let index = 0;
		for (const team of teams) {
			const teamUploadData = {
				school: schoolId,
				team_type: TeamTypes.indexOf(team.teamType) + 1,
				div: team.div,
			};

			await pb.collection('teams').update(teamIds[index], teamUploadData);
			index++;
		}
	};

	return (
		<div>
			{selected ? (
				<div>
					<Button onClick={() => setSelected(false)} className="absolute top-2 left-2">
						<Image src={arrow1} alt="Back to menu button" className="h-8 w-8" />
					</Button>
					<div className="absolute inset-0 m-auto h-fit w-fit flex flex-col items-center gap-4">
						<h2 className="font-extrabold text-2xl text-invert text-center">School info</h2>
						<div className="my-border my-shadow h-fit w-fit rounded-md bg-main p-4">
							<div className="h-fit w-fit flex flex-col gap-6">
								<datalist id="field-list">
									{FieldTypes.map(fieldType => (
										<option key={crypto.randomUUID()} aria-label="field-type" value={fieldType} />
									))}
								</datalist>
								<div className="flex gap-4 items-center">
									<label htmlFor="field">Has Field</label>
									<input
										defaultValue={FieldTypes[Number(selectedData?.field) - 1]}
										id="field"
										type="search"
										list="field-list"
										className="text-center my-border my-shadow h-10 w-full rounded-sm"
										onChange={e =>
											setSchoolEditData((draft: SchoolEditDataType) => {
												draft.field = e.target.value;

												return draft;
											})
										}
									/>
								</div>
								<div className="flex gap-4 items-center">
									<label htmlFor="name">Name</label>
									<input
										defaultValue={selectedData?.name}
										id="name"
										type="text"
										className="my-border my-shadow h-10 w-full rounded-sm text-center"
										onChange={e =>
											setSchoolEditData((draft: SchoolEditDataType) => {
												draft.name = e.target.value;
												return draft;
											})
										}
									/>
								</div>
								<div className="flex gap-4 items-center">
									<label htmlFor="code">Code</label>
									<input
										defaultValue={selectedData?.code}
										id="code"
										type="text"
										className="my-border my-shadow h-10 w-full rounded-sm text-center"
										onChange={e =>
											setSchoolEditData((draft: SchoolEditDataType) => {
												draft.code = e.target.value;
												return draft;
											})
										}
									/>
								</div>
							</div>
						</div>
						<h2 className="font-extrabold text-2xl text-invert text-center">Teams</h2>
						<div className="flex gap-2">
							{teams.map((team, index) => (
								<div key={team.id} className="w-fit h-fit bg-main rounded-md my-border my-shadow p-2">
									<h2 className="text-center font-bold text-lg">Team {index + 1}</h2>
									<div className="flex gap-4 items-center">
										<label htmlFor="code">Div</label>
										<input
											onChange={e => {
												if (!isNaN(Number(e.target.value)) && Number(e.target.value) >= 1 && Number(e.target.value) <= 3) {
													setTeams((draft: TeamEditType[]) => {
														draft[index].div = Number(e.target.value) as DivType;
														return draft;
													});
												}
											}}
											value={team.div}
											id="code"
											type="text"
											className="my-border my-shadow h-10 w-fit rounded-sm text-center"
										/>
									</div>
									<div className="flex gap-4 items-center">
										<label htmlFor="team-type">Team Type </label>
										<input
											onChange={e => {
												setTeams((draft: TeamEditType[]) => {
													draft[index].teamType = e.target.value as TeamType;
													return draft;
												});
											}}
											value={team.teamType}
											id="team-type"
											type="text"
											className="my-border my-shadow h-10 w-full rounded-sm text-center"
										/>
									</div>
								</div>
							))}
						</div>
					</div>
					<Button onClick={handleUpload} text="Upload" className="absolute inset-x-0 mx-auto bottom-10 w-fit font-bold text-xl" />
				</div>
			) : (
				<div className="my-grid grid h-fit w-full gap-10 p-4">
					{schoolData.map(school => (
						<div key={crypto.randomUUID()} className="w-full relative flex">
							<Button onClick={() => removeSchool(school)} className="w-fit h-fit">
								<Image className="h-3 w-3" src={remove} alt="remove icon" />
							</Button>
							<Button onClick={() => handleSelect(school.school_name, school.field, school.code)} className="w-full bg-main hover:bg-main-light relative">
								<p className="font-bold underline">{school.school_name}</p>
								<p>{`${String(teamInfo.filter(elm => elm.relationId === schoolData[25].id).map(elm => elm.div).length)} teams`}</p>
							</Button>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default EditData;
