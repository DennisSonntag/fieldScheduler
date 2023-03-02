import { useAutoAnimate } from '@formkit/auto-animate/react';
import Image from 'next/image';
import { useImmer } from 'use-immer';

import plus from '@svg/add.svg';

import SchoolInput, { TeamInputType } from './SchoolInput';

type AltFieldType = 'cru' | 'irish';
type FieldType = 'alt' | 'single' | 'double';

export type SchoolInputType = {
	name?: string;
	code?: string;
	blackoutDates?: Date[];
	fieldType?: FieldType;
	altField?: AltFieldType;
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

	return (
		<div>
			<div className="flex justify-center gap-2 p-2">
				<button onClick={enlaregeArray} type="button" className="my-border my-shadow smooth-scale flex gap-2 rounded-md bg-accent p-2 hover:scale-110 active:scale-90">
					<p>Add School</p>
					<Image className="h-6 w-6" src={plus} alt="add icon" />
				</button>
				{schools.length !== 0 && (
					<button type="button" className="my-border my-shadow h-fit w-fit rounded-md bg-accent p-2 hover:scale-110 active:scale-90">
						Upload Data
					</button>
				)}
			</div>

			<div ref={animateRef} className="relative h-fit w-full flex-col items-center gap-4">
				{schools.map((elm, index) => (
					<SchoolInput setState={setSchools} currentState={elm} index={index} />
				))}
			</div>
		</div>
	);
};

export default CreateData;
