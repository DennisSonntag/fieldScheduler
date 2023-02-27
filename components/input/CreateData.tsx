import { useState } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import Image from 'next/image';
import plus from '@svg/add.svg';
import SchoolInput from './SchoolInput';

type Team = {
	Gender: 'Boys' | 'Girls';
	Seniority: 'Sr' | 'Jr';
	Division: 1 | 2 | 3;
};

type AltField = 'Cru' | 'Irish';

type School = {
	Name: string;
	Code: string;
	BlackoutDates: Date[];
	FieldInfo: AltField | 'Single' | 'Double';
	Teams: Team[];
};

export type Item = { [key: number]: School | null };

const CreateData = () => {
	const [schools, setSchools] = useState<Item[]>([]);

	const enlaregeArray = () => {
		const keys: number[] = Object.keys(schools).map(Number);
		const id = Math.max(...keys) + 1;
		const obj: Item = {};
		obj[id] = null;
		setSchools(prev => [...prev, obj]);
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
					<button type="button" className="my-border my-shadow smooth-scale flex gap-2 rounded-md bg-accent p-2 hover:scale-110 active:scale-90">
						Upload Data
					</button>
				)}
			</div>

			<div ref={animateRef} className="relative h-fit w-full flex-col items-center gap-4">
				{schools.map((school, index) => (
					<SchoolInput setState={setSchools} state={schools} selfId={Number(Object.keys(school)[0])} index={index} />
				))}
			</div>
		</div>
	);
};

export default CreateData;
