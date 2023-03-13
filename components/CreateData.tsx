import { useAutoAnimate } from '@formkit/auto-animate/react';
import Image from 'next/image';
import { useImmer } from 'use-immer';

import { AltField, FieldType } from '@ts/matchUp';

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

const CreateData = () => {
	const [schools, setSchools] = useImmer<SchoolInputType[]>([]);

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

	const [animateRef] = useAutoAnimate<HTMLDivElement>();

	const handleUpload = () => {
		console.log(schools);
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
