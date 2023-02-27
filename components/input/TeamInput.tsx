import { useState, useId, Dispatch, SetStateAction, FC } from 'react';
import Image from 'next/image';
import remove from '@svg/remove.svg';

type PropType = {
	index: number;
	setState: Dispatch<SetStateAction<number[]>>;
	state: number[];
};

const TeamInput: FC<PropType> = ({ index, setState, state }) => {
	const id = useId();

	const removeSelf = () => {
		const array = [...state];
		const idx = array.indexOf(index);
		if (idx > -1) {
			// only splice array when item is found
			array.splice(idx, 1); // 2nd parameter means remove one item only
		}
		setState(array);
	};

	return (
		<form className="relative flex h-fit w-fit bg-main">
			<fieldset className="my-shadow rounded-md p-2">
				<legend className="text-2xl font-bold">Team {index} Info</legend>

				<button type="button" onClick={removeSelf} className="smooth-scale my-border absolute top-2 right-2 h-2 w-2 rounded-md bg-accent p-2 hover:scale-110 active:scale-90">
					<Image className="w-1 h-1" src={remove} alt="remove icon" />
				</button>

				<div className="flex gap-2">
					<fieldset className="my-border flex-col items-center justify-center rounded-md p-2">
						<legend className="text-lg font-bold">Gender</legend>
						<div className="h-fit w-fit">
							<input type="radio" id={`boys${id}`} name={`gender${id}`} className="my-border relative inset-x-0 mx-auto inline-block h-fit w-fit cursor-pointer" />
							<label htmlFor={`boys${id}`} className="mx-1 cursor-pointer">
								Boys
							</label>
						</div>
						<div className="h-fit w-fit">
							<input type="radio" id={`girls${id}`} name={`gender${id}`} className="my-border relative inset-x-0 mx-auto inline-block h-fit w-fit cursor-pointer" />
							<label htmlFor={`girls${id}`} className="mx-1 cursor-pointer">
								Girls
							</label>
						</div>
					</fieldset>

					<fieldset className="my-border flex-col items-center justify-center rounded-md p-2">
						<legend className="text-lg font-bold">Seniority</legend>
						<div className="h-fit w-fit">
							<input type="radio" id={`sr${id}`} name={`Seniroity${id}`} className="relative inset-x-0 mx-auto inline-block h-fit w-fit cursor-pointer" />
							<label htmlFor={`sr${id}`} className="mx-1 cursor-pointer">
								Sr
							</label>
						</div>
						<div className="h-fit w-fit">
							<input type="radio" id={`jr${id}`} name={`Seniroity${id}`} className="relative inset-x-0 mx-auto inline-block h-fit w-fit cursor-pointer" />
							<label htmlFor={`jr${id}`} className="mx-1 cursor-pointer">
								Jr
							</label>
						</div>
					</fieldset>

					<fieldset className="my-border flex-col rounded-md p-2">
						<legend className="text-lg font-bold">Division</legend>
						<div className="h-fit w-fit">
							<input type="radio" id={`div1${id}`} name={`Division${id}`} className="my-border relative inset-x-0 mx-auto inline-block h-fit w-fit cursor-pointer" />
							<label htmlFor={`div1${id}`} className="mx-1 cursor-pointer">
								Div 1
							</label>
						</div>
						<div className="h-fit w-fit">
							<input type="radio" id={`div2${id}`} name={`Division${id}`} className="my-border relative inset-x-0 mx-auto inline-block h-fit w-fit cursor-pointer" />
							<label htmlFor={`div2${id}`} className="mx-1 cursor-pointer">
								Div 2
							</label>
						</div>
						<div className="h-fit w-fit">
							<input type="radio" id={`div3${id}`} name={`Division${id}`} className="my-border relative inset-x-0 mx-auto inline-block h-fit w-fit cursor-pointer" />
							<label htmlFor={`div3${id}`} className="mx-1 cursor-pointer">
								Div 3
							</label>
						</div>
					</fieldset>
				</div>
			</fieldset>
		</form>
	);
};
export default TeamInput;
