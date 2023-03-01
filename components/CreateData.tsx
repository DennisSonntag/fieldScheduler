import { useState } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import Image from 'next/image';
import plus from '@svg/add.svg';
import SchoolInput from './SchoolInput';

const CreateData = () => {
	const [schools, setSchools] = useState<number[]>([]);

	const enlaregeArray = () => {
		setSchools(prev => [...prev, 1]);
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
				{schools.map(() => (
					<SchoolInput setState={setSchools} state={schools} />
				))}
			</div>
		</div>
	);
};

export default CreateData;
