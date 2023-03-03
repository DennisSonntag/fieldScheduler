import { useAtom } from 'jotai';
import Image from 'next/image';
import { startEndDateAtom, divAtom, SchoolDataAtom, schoolAtom, seniorityAtom, genderAtom } from 'pages/main';
import { useEffect, useRef, useState } from 'react';

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

	const [divSelect, setDivSelect] = useAtom(divAtom);
	const [schoolSelect, setSchoolSelect] = useAtom(schoolAtom);
	const [senioritySelect, setSenioritySelect] = useAtom(seniorityAtom);
	const [genderSelect, setGenderSelect] = useAtom(genderAtom);

	const divisions = ['Div 1', 'Div 2', 'Div 3'];
	const seniorities = ['Sr', 'Jr'];
	const gender = ['Girls', 'Boys'];

	const dialogRef = useRef(null);

	const handleClick = () => {
		const dialog = dialogRef.current as unknown as any;

		dialog.showModal();
	};

	const closeModal = () => {
		const dialog = dialogRef.current as unknown as any;

		dialog.close();
	};
	const [editActive, setEditActive] = useState(true);

	const [startDate, setStartDate] = useState(new Date(2023, 2, 0));
	const [endDate, setEndDate] = useState(new Date(2023, 5, 31));
	const setStartEndDate = useAtom(startEndDateAtom)[1];

	const changeDates = () => {
		setStartEndDate([startDate, endDate]);
	};

	const dateToInputValue = (date: Date) => {
		const local = new Date(date);
		local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
		return local.toJSON().slice(0, 10);
	};

	const startDateRef = useRef<HTMLInputElement>(null);
	const endDateRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		startDateRef.current!.value = dateToInputValue(startDate);
		endDateRef.current!.value = dateToInputValue(endDate);
	}, []);

	return (
		<section className="hover-fade relative flex h-full w-[40%] flex-col gap-2 overflow-hidden rounded-bl-xl">
			<dialog ref={dialogRef} className="my-border my-shadow absolute inset-0 m-auto h-[80%] w-[80%] flex-col overflow-y-scroll rounded-xl bg-back backdrop:bg-black/40 backdrop:backdrop-blur-lg">
				<Button onClick={closeModal} className="absolute top-2 right-2">
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

			<Title text="Filters" />

			<div className="my-col-3 grid h-fit w-full auto-rows-auto items-center justify-around gap-1">
				<Filter options={divisions} title="Div" selected={divSelect} setSelected={setDivSelect} />
				<Filter scroll options={schoolNames} title="School" selected={schoolSelect} setSelected={setSchoolSelect} />
				<Filter options={seniorities} title="Sr/Jr" selected={senioritySelect} setSelected={setSenioritySelect} />
				<Filter options={gender} title="Gender" selected={genderSelect} setSelected={setGenderSelect} />
			</div>

			<Chip list={divSelect as string[]} />
			<Chip list={schoolSelect as string[]} />
			<Chip list={senioritySelect as string[]} />
			<Chip list={genderSelect as string[]} />

			<div className="absolute bottom-0 flex h-fit w-full flex-grow  flex-col items-center gap-2 p-6">
				<div className="flex gap-2 items-center">
					<Button onClick={handleClick} text="Edit Team data" />

					{/*
					 <Button text="Remove all teams!" onClick={handleRemoveAll}>
						<Image className="h-4 w-4" src={remove} alt="remove icon" />
					</Button>
					*/}
				</div>
				<div className="my-border my-shadow bg-main rounded-md p-2 relative flex flex-col items-center gap-4">
					<h1 className="text-md py-2 px-8 text-center font-extrabold text-stark">Season Start/End</h1>
					<div className="flex items-center gap-2">
						<DatePicker ref={startDateRef} onChange={e => setStartDate(e.currentTarget.valueAsDate as Date)} />
						<Image src={arrow} alt="Arrow Icon" className="h-6 w-6 rotate-180" />
						<DatePicker ref={endDateRef} onChange={e => setEndDate(e.currentTarget.valueAsDate as Date)} />
					</div>
					<Button onClick={changeDates} text="Confirm" />
				</div>
			</div>
		</section>
	);
};

export default Left;
