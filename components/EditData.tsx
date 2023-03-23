/* eslint-disable no-restricted-globals */

/* eslint-disable no-alert */

/* eslint-disable no-await-in-loop */

/* eslint-disable no-restricted-syntax */
import { Crypto } from '@peculiar/webcrypto';
import { useAtom } from 'jotai';
import Image from 'next/image';
import { DivType, FieldType, FieldTypes } from 'pages/api/calculate';
import { SchoolDataAtom, SchoolType, TeamInfoAtom, pb } from 'pages/main';
import { useEffect, useState } from 'react';
import { useImmer } from 'use-immer';

import arrow1 from '@svg/arrow1.svg';
import remove from '@svg/remove.svg';

import Button from './Button';
import { GenderType, SeniorityType, TeamInputType } from './SchoolInput';
import TeamInput from './TeamInput';

type SelectedDataType = {
	name: string;
	field: FieldType;
	code: string;
};

const crypto = new Crypto();

const EditData = () => {
	const [schoolData, setSchoolData] = useAtom(SchoolDataAtom);
	const teamInfo = useAtom(TeamInfoAtom)[0];

	const [selectedData, setSelectedData] = useState<SelectedDataType>();
	const [selected, setSelected] = useState(false);

	const [teams, setTeams] = useImmer<TeamInputType[]>([]);

	const handleSelect = (name: string, field: FieldType, code: string) => {
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
		field: FieldType;
		name: string;
		code: string;
	};
	const [schoolEditData, setSchoolEditData] = useImmer<SchoolEditDataType>({
		name: '',
		field: '' as FieldType,
		code: '',
	});

	useEffect(() => {
		setSchoolEditData((draft: SchoolEditDataType) => {
			draft.field = selectedData?.field!;
			draft.name = selectedData?.name as string;
			draft.code = selectedData?.code as string;
		});

		setTeams(
			teamInfo
				.filter(elm => elm.school === selectedData?.name)
				.map(elm => ({
					div: elm.div as DivType,
					seniority: elm.type.split(/(?=[A-Z])/)[0] as SeniorityType,
					gender: elm.type
						.split(/(?=[A-Z])/)[1]
						.toLowerCase()
						.slice(0, -1) as GenderType,
					id: Number(elm.id.replace(/\D/g, '')),
				}))
		);
	}, [selectedData]);

	const [isError, setIsError] = useState(false);

	useEffect(() => {
		if (isError) {
			setTimeout(() => {
				setIsError(false);
			}, 1000);
		}
	}, [isError]);

	const [loading, setLoading] = useState(false);

	const handleUpload = async () => {
		if (!FieldTypes.includes(schoolEditData.field)) {
			setIsError(true);
			return;
		}

		setLoading(true);
		// update school info
		const schoolId = schoolData.filter(elm => elm.school_name === selectedData?.name)[0].id;
		const schoolUploadData = {
			school_name: schoolEditData.name,
			school_code: schoolEditData.code,
			has_field: schoolEditData.field,
		};

		await pb.collection('schools').update(schoolId, schoolUploadData);

		// update team info
		const teamIds = teamInfo.filter(elm => elm.school === selectedData?.name).map(elm => elm.id);

		let index = 0;
		for (const team of teams) {
			const teamUploadData = {
				school: schoolId,
				team_type: `${team.seniority}${team.gender}`,
				div: team.div,
			};

			await pb.collection('teams').update(teamIds[index], teamUploadData);
			index++;
		}
		setLoading(false);
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
										defaultValue={selectedData?.field}
										id="field"
										type="search"
										list="field-list"
										className="text-center my-border my-shadow h-10 w-full rounded-sm"
										onChange={e =>
											setSchoolEditData((draft: SchoolEditDataType) => {
												draft.field = e.target.value as FieldType;

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
							{teams.map((elm, indexArg) => (
								<TeamInput inEdit key={elm.id} currentState={elm} setState={setTeams} index={indexArg} />
							))}
						</div>
					</div>
					<p className={`${isError ? 'opacity-100' : 'opacity-0'} smooth-scale text-center bottom-2 w-fit h-fit text-red-500 font-bold text-xl absolute inset-x-0 mx-auto`}>Invalid field type</p>
					<Button onClick={handleUpload} text={loading ? 'loading....' : ' Upload'} className="absolute inset-x-0 mx-auto bottom-10 w-fit font-bold text-xl" />
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
								<p>{`${String(teamInfo.filter(elm => elm.relationId === school.id).map(elm => elm.div).length)} teams`}</p>
							</Button>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default EditData;
