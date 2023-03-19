/* eslint-disable no-await-in-loop */

/* eslint-disable no-restricted-syntax */
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useAtom } from 'jotai';
import Image from 'next/image';
import { SchoolDataAtom, TeamInfoAtom } from 'pages/main';
import PocketBase from 'pocketbase';
import { useImmer } from 'use-immer';

import { AltField, FieldType, FieldTypes, TeamType, TeamTypes } from '@ts/matchUp';

import plus from '@svg/add.svg';

import Button from './Button';
import SchoolInput, { TeamInputType } from './SchoolInput';

export type SchoolInputType = {
	name?: string;
	code?: string;
	blackoutDates?: Date[];
	fieldType?: FieldType;
	altField?: AltField;
	teams?: TeamInputType[];
	id: number;
};

// const pb = new PocketBase('https://schedulerdatabase.fly.dev');
const pb = new PocketBase('http://127.0.0.1:8090');

const CreateData = () => {
	const [schools, setSchools] = useImmer<SchoolInputType[]>([]);
	const setSchoolData = useAtom(SchoolDataAtom)[1];
	const setTeamInfo = useAtom(TeamInfoAtom)[1];

	const enlaregeArray = () => {
		setSchools((draft: SchoolInputType[]) => {
			const last = draft.at(-1);
			if (last === undefined) {
				draft.push({ id: 0 });
			} else {
				draft.push({ id: last.id + 1 });
			}
		});
	};

	const firstLetterCaps = (string: string): string => string.charAt(0).toUpperCase() + string.slice(1);

	const [animateRef] = useAutoAnimate<HTMLDivElement>();

	const handleUpload = async () => {
		for (const school of schools) {
			if (school.teams !== undefined && school.fieldType !== undefined && school.name !== undefined && school.code !== undefined) {
				const hasFieldNum = FieldTypes.indexOf(school.fieldType) + 1;
				const schoolData = {
					school_name: school.name,
					school_code: school.code,
					has_field: hasFieldNum,
				};

				const record = await pb.collection('schools').create(schoolData);

				for (const team of school.teams) {
					if (team.div !== undefined && team.seniority !== undefined && team.gender !== undefined) {
						const teamTypeString = `${team.seniority}${firstLetterCaps(team.gender)}s` as TeamType;
						const teamType = TeamTypes.indexOf(teamTypeString) + 1;
						const teamData = {
							school: record.id,
							team_type: teamType,
							div: team.div,
						};

						await pb.collection('teams').create(teamData);
					}
				}
			}
		}
		setSchools([]);
		const records = await pb.collection('schools').getFullList(200 /* batch size */, {
			sort: '-created',
		});

		const schoolDataRaw = records.map(elm => ({ school_name: elm.school_name, code: elm.school_code, id: elm.id, field: elm.has_field }));

		const records2 = await pb.collection('teams').getFullList(200 /* batch size */, {
			sort: '-created',
		});

		const teamRaw = records2.map(elm => ({
			school: schoolDataRaw.filter(elm2 => elm2.id === elm.school)[0].school_name,
			type: elm.team_type,
			field: schoolDataRaw.filter(elm2 => elm2.id === elm.school)[0].field,
			id: elm.id,
			div: elm.div,
		}));

		setSchoolData(schoolDataRaw);
		setTeamInfo(teamRaw);
	};

	return (
		<>
			<div className="flex justify-center gap-2 p-2">
				<Button text="Add School" onClick={enlaregeArray} className="flex gap-2">
					<Image className="h-6 w-6" src={plus} alt="add icon" />
				</Button>
				{schools.length !== 0 && <Button onClick={handleUpload} text="Upload Data" />}
			</div>

			<div ref={animateRef} className="relative h-fit w-full flex-col items-center gap-4">
				{schools.map((elm, index) => (
					<SchoolInput key={elm.id} setState={setSchools} currentState={elm} index={index} />
				))}
			</div>
		</>
	);
};

export default CreateData;
