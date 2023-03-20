import { useAtom } from 'jotai';
import Image from 'next/image';
import { AltFieldTypes, FieldTypes, WeekDayTypes } from 'pages/api/calculate';
import { StartEndDateAtom, DivAtom, SchoolDataAtom, SchoolAtom, SeniorityAtom, GenderAtom, RefNumAtom, FieldAtom, AltAtom } from 'pages/main';
import { useRef, useState } from 'react';

import arrow from '@svg/arrow1.svg';
import remove from '@svg/remove.svg';

import Button from './Button';
import Chip from './Chip';
import CreateData from './CreateData';
import DatePicker from './DatePicker';
import EditData from './EditData';
import Filter from './Filter';
import Title from './Title';

const Left = () => {
	const [schoolData] = useAtom(SchoolDataAtom);
	const schoolNames = schoolData.map(elm => elm.school_name.trim());

	const [divSelect, setDivSelect] = useAtom(DivAtom);
	const [schoolSelect, setSchoolSelect] = useAtom(SchoolAtom);
	const [senioritySelect, setSenioritySelect] = useAtom(SeniorityAtom);
	const [genderSelect, setGenderSelect] = useAtom(GenderAtom);
	const [fieldSelect, setFieldSelect] = useAtom(FieldAtom);
	const [altSelect, setAltSelect] = useAtom(AltAtom);

	const divisions = ['Div 1', 'Div 2', 'Div 3'];
	const seniorities = ['Sr', 'Jr'];
	const gender = ['Girls', 'Boys'];

	const dialogEditRef = useRef(null);
	const dialogAltRef = useRef(null);

	const openEditMenu = () => {
		const dialog = dialogEditRef.current as unknown as any;

		dialog.showModal();
	};

	const closeEditMenu = () => {
		const dialog = dialogEditRef.current as unknown as any;

		dialog.close();
	};

	const openAltMenu = () => {
		const dialog = dialogAltRef.current as unknown as any;

		dialog.showModal();
	};

	const closeAltMenu = () => {
		const dialog = dialogAltRef.current as unknown as any;

		dialog.close();
	};

	const [editActive, setEditActive] = useState(true);

	const [startDate, setStartDate] = useState(new Date(2023, 2, 1));
	const [endDate, setEndDate] = useState(new Date(2023, 5, 30));
	const setStartEndDate = useAtom(StartEndDateAtom)[1];
	const setRefNum = useAtom(RefNumAtom)[1];
	const [numberOfRefs, setNumberOfRefs] = useState<number | string>(8);

	const handleConfirm = () => {
		setStartEndDate([startDate, endDate]);
		setRefNum(numberOfRefs as number);
	};

	const dateToInputValue = (date: Date) => {
		const local = new Date(date);
		local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
		return local.toJSON().slice(0, 10);
	};

	const isNumeric = (value: string) => /^-?\d+$/.test(value);

	return (
		<section className="hover-fade relative flex h-full w-[40%] flex-col gap-2 overflow-hidden rounded-bl-xl">
			<dialog ref={dialogEditRef} className="my-border my-shadow absolute inset-0 m-auto h-[80%] w-[80%] flex-col overflow-y-scroll rounded-xl bg-back backdrop:bg-black/40 backdrop:backdrop-blur-lg">
				<Button onClick={closeEditMenu} className="absolute top-2 right-2">
					<Image className="h-6 w-6" src={remove} alt="remove icon" />
				</Button>
				<div className="h-fit w-full p-2">
					<div className="inset-x-0 top-4 mx-auto flex h-fit w-fit gap-2 p-2">
						<Button onClick={() => setEditActive(true)} className={`${editActive ? 'bg-main text-invert hover:bg-main-light' : 'text-stark'} text-2xl font-bold`}>
							Edit
						</Button>
						<Button onClick={() => setEditActive(false)} className={`${!editActive ? 'bg-main text-invert hover:bg-main-light' : 'text-stark'} text-2xl font-bold`}>
							Add
						</Button>
					</div>
				</div>
				<div className="h-fit w-full">{editActive ? <EditData /> : <CreateData />}</div>
			</dialog>

			<dialog ref={dialogAltRef} className="my-border my-shadow absolute inset-0 m-auto h-[80%] w-[80%] flex-col overflow-y-scroll rounded-xl bg-back backdrop:bg-black/40 backdrop:backdrop-blur-lg">
				<Button onClick={closeAltMenu} className="absolute top-2 right-2">
					<Image className="h-6 w-6" src={remove} alt="remove icon" />
				</Button>
				<div className="h-fit w-[90%] flex flex-col m-4 gap-4 items-center">
					<div className="w-full h-full bg-main flex-grow relative flex flex-col items-center">
						<h1 className="text-xl font-bold text-center">cru</h1>
						<div className="flex justify-around flex-wrap w-full">
							{['fields', ...WeekDayTypes].map(day => (
								<div className="flex flex-col gap-2">
									<h2>{day}</h2>
									{day === 'fields' && [1, 2, 3, 4, 5].map(field => <div>{field}</div>)}
									{day !== 'fields' && [1, 2, 3, 4, 5].map(field => <input type="time" className='my-border'/>)}
								</div>
							))}
						</div>
					</div>
					<div className="w-full h-full bg-main flex-grow relative">
						<h1>irish</h1>
					</div>
				</div>
			</dialog>

			<Title text="Filters" />

			<div className="my-col-3 grid h-fit w-full auto-rows-auto items-center justify-around gap-1">
				<Filter options={divisions} title="Div" selected={divSelect} setSelected={setDivSelect} />
				<Filter scroll options={schoolNames} title="School" selected={schoolSelect} setSelected={setSchoolSelect} />
				<Filter options={seniorities} title="Sr/Jr" selected={senioritySelect} setSelected={setSenioritySelect} />
				<Filter options={gender} title="Gender" selected={genderSelect} setSelected={setGenderSelect} />

				<Filter options={FieldTypes as unknown as string[]} title="Field" selected={fieldSelect} setSelected={setFieldSelect} />
				{fieldSelect.includes('alt') ? <Filter options={AltFieldTypes as unknown as string[]} title="Alt" selected={altSelect} setSelected={setAltSelect} /> : null}
			</div>

			<Chip list={divSelect} />
			<Chip list={schoolSelect} />
			<Chip list={senioritySelect} />
			<Chip list={genderSelect} />
			<Chip list={fieldSelect} />
			<Chip list={altSelect} />

			<div className="absolute bottom-0 flex h-fit w-full flex-grow  flex-col items-center gap-2 p-6">
				<div className="flex gap-2 items-center flex-col">
					<Button onClick={openEditMenu} text="Edit Team data" />
					<Button onClick={openAltMenu} text="Edit Cru and irish availibility" />
				</div>
				<div className="my-border my-shadow bg-main rounded-md p-2 relative flex flex-col items-center gap-4">
					<h1 className="text-lg text-center font-extrabold text-stark underline">Data Input</h1>
					<h2 className="text-md text-center font-bold text-stark">Number of refs</h2>
					<input
						value={numberOfRefs}
						onChange={e => {
							if (isNumeric(e.target.value) || e.target.value.length === 0) {
								setNumberOfRefs(e.target.value);
							}
						}}
						className="my-border my-shadow rounded-md bg-accent p-2 text-center hover:bg-accent-light"
					/>

					<h2 className="text-md text-center font-bold text-stark">Season Start/End</h2>
					<div className="flex items-center gap-2">
						<DatePicker defaultValue={dateToInputValue(startDate)} onChange={e => setStartDate(e.currentTarget.valueAsDate as Date)} />
						<Image src={arrow} alt="Arrow Icon" className="h-6 w-6 rotate-180" />
						<DatePicker defaultValue={dateToInputValue(endDate)} onChange={e => setEndDate(e.currentTarget.valueAsDate as Date)} />
					</div>
					<Button onClick={handleConfirm} text="Confirm" />
				</div>
			</div>
		</section>
	);
};

export default Left;
