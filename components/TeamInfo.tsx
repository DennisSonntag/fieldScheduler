import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { divAtom, SchoolDataAtom, schoolAtom, seniorityAtom, genderAtom } from 'pages/main';
import { useAtom } from 'jotai';
import Filter from './Filter';
import FilterChip from './FilterChip';
import EditData from './EditData';
import CreateData from './CreateData';

const TeamInfo = () => {
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

	return (
		<div className="relative flex h-full w-full flex-col gap-2">
			<dialog ref={dialogRef} className="my-border my-shadow absolute inset-0 m-auto h-[80%] w-[80%] flex-col rounded-xl bg-main backdrop:bg-black backdrop:opacity-80">
				<button type="button" onClick={closeModal} className="smooth-scale my-shadow my-border absolute top-2 right-2 h-fit w-fit rounded-md bg-accent hover:scale-110 active:scale-90">
					<svg className="h-10 w-10 fill-stark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
						<path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
					</svg>
				</button>
				<div className="h-fit w-full">
					<div className="inset-x-0 top-4 mx-auto flex h-fit w-fit gap-2">
						<button type="button" onClick={() => setEditActive(true)} className={`${editActive ? 'bg-main text-black' : 'bg-accent'} my-shadow my-border relative h-fit w-fit rounded-md p-3 text-xl font-bold text-stark duration-150 ease-in-out hover:px-6 active:px-4`}>
							Edit
						</button>
						<button type="button" onClick={() => setEditActive(false)} className={`${!editActive ? 'bg-main text-black' : 'bg-accent'} my-shadow my-border relative h-fit w-fit rounded-md p-3 text-xl font-bold text-stark duration-150 ease-in-out hover:px-6 active:px-4`}>
							Add
						</button>
					</div>
				</div>
				<div className="h-fit w-full">{editActive ? <EditData /> : <CreateData />}</div>
			</dialog>

			<button title="Edit Team Data" onClick={handleClick} type="button" className="my-shadow my-border smooth-scale relative inset-x-0 mx-auto h-fit w-fit rounded-md bg-main p-3 font-bold text-invert hover:scale-110 active:scale-90">
				Edit Team data
			</button>

			<div className="my-col-3 grid h-fit w-full auto-rows-auto items-center justify-around gap-2">
				<Filter options={divisions} title="Div" selected={divSelect as string[]} setSelected={setDivSelect as Dispatch<SetStateAction<string[]>>} />
				<Filter scroll options={schoolNames} title="School" selected={schoolSelect as string[]} setSelected={setSchoolSelect as Dispatch<SetStateAction<string[]>>} />
				<Filter options={seniorities} title="Sr/Jr" selected={senioritySelect as string[]} setSelected={setSenioritySelect as Dispatch<SetStateAction<string[]>>} />
				<Filter options={gender} title="Gender" selected={genderSelect as string[]} setSelected={setGenderSelect as Dispatch<SetStateAction<string[]>>} />
			</div>

			<FilterChip selected={divSelect as string[]} />
			<FilterChip selected={schoolSelect as string[]} />
			<FilterChip selected={senioritySelect as string[]} />
			<FilterChip selected={genderSelect as string[]} />
		</div>
	);
};

export default TeamInfo;
