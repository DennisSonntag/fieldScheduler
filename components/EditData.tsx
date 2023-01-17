import { schoolDataAtom } from 'pages/main';
import { FC, useState } from 'react';
import Image from 'next/image';
import arrow1 from '@svg/arrow1.svg';
import { useAtom } from 'jotai';

type PropTypes = {
	close: () => void;
};
const EditData: FC<PropTypes> = ({ close }) => {
	const schoolData = useAtom(schoolDataAtom)[0];
	const [selected, setSelected] = useState(false);
	type SelectedDataType = {
		name: string;
		field: number;
	};
	const [selectedData, setSelectedData] = useState<SelectedDataType>();

	const handleSelect = (name: string, field: number) => {
		setSelected(true);
		setSelectedData({
			name,
			field,
		});
	};

	return (
		<>
			<div className="absolute inset-x-0 top-4 mx-auto flex h-fit w-fit gap-2">
				<h1 className="my-shadow my-border relative h-fit w-fit rounded-md bg-accent p-3 text-xl font-bold text-stark duration-150 ease-in-out hover:px-6 active:px-4">Edit</h1>
				<h1 className="my-shadow my-border relative h-fit w-fit rounded-md bg-accent p-3 text-xl font-bold text-stark duration-150 ease-in-out hover:px-6 active:px-4">Add/Remove</h1>
			</div>
			<button type="button" onClick={close} className="smooth-scale my-shadow my-border absolute top-4 right-4 h-fit w-fit rounded-md bg-accent hover:scale-110 active:scale-90">
				<svg className="h-10 w-10 fill-stark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
					<path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
				</svg>
			</button>
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
				<div className="my-grid mt-32 grid h-fit w-full gap-10">
					{schoolData.map(school => (
						<button key={school.school_name} type="button" onClick={() => handleSelect(school.school_name, school.field)} className="my-border my-shadow smooth-scale relative m-auto h-fit w-fit rounded-md p-2 text-center hover:scale-110 active:scale-90">
							<p className="font-bold">{school.school_name}</p>
							<p className={school.field ? 'text-green-500' : 'text-bug'}>Has field {String(school.field)}</p>
						</button>
					))}
				</div>
			)}
		</>
	);
};
export default EditData;
