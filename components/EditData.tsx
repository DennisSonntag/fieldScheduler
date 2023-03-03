import { useAtom } from 'jotai';
import Image from 'next/image';
import { SchoolDataAtom } from 'pages/main';
import { useState } from 'react';

import arrow1 from '@svg/arrow1.svg';

import Button from './Button';

type SelectedDataType = {
	name: string;
	field: number;
};

const EditData = () => {
	const [schoolData] = useAtom(SchoolDataAtom);
	const [selectedData, setSelectedData] = useState<SelectedDataType>();
	const [selected, setSelected] = useState(false);

	const handleSelect = (name: string, field: number) => {
		setSelected(true);
		setSelectedData({
			name,
			field,
		});
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
						<Button key={school.school_name} onClick={() => handleSelect(school.school_name, school.field)} className="w-full bg-main hover:bg-main-light">
							<p className="font-bold">{school.school_name}</p>
							<p className={school.field ? 'text-green-500' : 'text-bug'}>Has field {String(school.field)}</p>
						</Button>
					))}
				</div>
			)}
		</div>
	);
};

export default EditData;
