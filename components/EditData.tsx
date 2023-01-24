import { useAtom } from 'jotai';
import { SchoolDataAtom } from 'pages/main';
import { FC, useState } from 'react';
import arrow1 from '@svg/arrow1.svg';
import Image from 'next/image';

type SelectedDataType = {
	name: string;
	field: number;
};

const DataMenu = () => {
	const schoolData = useAtom(SchoolDataAtom)[0];
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
					<button type="button" onClick={() => setSelected(false)}>
						<Image src={arrow1} alt="Dark/Light mode toggle button" className="my-border inv my-shadow smooth-scale absolute top-2 left-2 h-10 w-10 rounded-md bg-accent p-2 hover:scale-105 active:scale-95" />
					</button>
					<div className="my-border my-shadow absolute inset-0 m-auto h-fit w-fit rounded-md p-2">
						<p className="font-bold">{selectedData?.name}</p>
						<p className={selectedData?.field ? 'text-green-500' : 'text-bug'}>Has field {String(selectedData?.field)}</p>
					</div>
					<div className="absolute inset-x-0 bottom-40 mx-auto h-fit w-fit flex-col gap-2">
						<div>
							<label htmlFor="field">Has Field</label>
							<input id="field" type="text" className="my-border my-shadow h-10 w-[5rem] rounded-sm" />
						</div>
						<div>
							<label htmlFor="div">Div</label>
							<input id="div" type="text" className="my-border my-shadow h-10 w-[5rem] rounded-sm" />
						</div>
					</div>
					<button type="button" className="my-border my-accent my-shadow smooth-scale absolute inset-x-0 bottom-10 mx-auto h-fit w-fit rounded-md bg-accent p-2 text-2xl font-bold text-stark hover:scale-90 active:scale-110">
						Upload
					</button>
				</div>
			) : (
				<div className="my-grid grid h-fit w-full gap-10 p-4">
					{schoolData.map(school => (
						<button key={school.school_name} type="button" onClick={() => handleSelect(school.school_name, school.field)} className="my-border my-shadow smooth-scale relative m-auto h-fit w-full w-fit rounded-md bg-main p-2 text-center hover:scale-110 active:scale-90">
							<p className="font-bold">{school.school_name}</p>
							<p className={school.field ? 'text-green-500' : 'text-bug'}>Has field {String(school.field)}</p>
						</button>
					))}
				</div>
			)}
		</div>
	);
};

export default DataMenu;
