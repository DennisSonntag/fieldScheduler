import { useId, FC } from 'react';
import { Updater } from 'use-immer';
import remove from '@svg/remove.svg';
import Image from 'next/image';
import { TeamInputType } from './SchoolInput';

type PropTypes = {
	setState: Updater<TeamInputType[]>;
	currentState: TeamInputType;
	index: number;
};

const TeamInput: FC<PropTypes> = ({ setState, currentState, index }) => {
	const id = useId();

	const removeSelf = () => {
		setState(draft => {
			if (index > -1) {
				draft.splice(index, 1);
			}
		});
	};

	return (
		<form className="relative flex h-fit w-fit bg-main">
			<fieldset className="my-shadow rounded-md p-2">
				<legend className="text-2xl font-bold">Team {currentState.id} Info</legend>

				<button type="button" onClick={removeSelf} className="smooth-scale my-border absolute top-2 right-2 h-fit w-fit rounded-md bg-accent p-2 hover:scale-110 active:scale-90">
					<Image className="h-3 w-3" src={remove} alt="remove icon" />
				</button>

				<div className="flex gap-2">
					<fieldset className="my-border flex-col items-center justify-center rounded-md p-2">
						<legend className="text-lg font-bold">Gender</legend>
						<div className="h-fit w-fit">
							<input
								checked={currentState.gender === 'boy'}
								onChange={() =>
									setState(draft => {
										draft[index].gender = 'boy';
										return draft;
									})
								}
								type="radio"
								id={`boys${id}`}
								name={`gender${id}`}
								className="my-border relative inset-x-0 mx-auto inline-block h-fit w-fit cursor-pointer"
							/>
							<label htmlFor={`boys${id}`} className="mx-1 cursor-pointer">
								Boys
							</label>
						</div>
						<div className="h-fit w-fit">
							<input
								checked={currentState.gender === 'girl'}
								onChange={() =>
									setState(draft => {
										draft[index].gender = 'girl';
										return draft;
									})
								}
								type="radio"
								id={`girls${id}`}
								name={`gender${id}`}
								className="my-border relative inset-x-0 mx-auto inline-block h-fit w-fit cursor-pointer"
							/>
							<label htmlFor={`girls${id}`} className="mx-1 cursor-pointer">
								Girls
							</label>
						</div>
					</fieldset>

					<fieldset className="my-border flex-col items-center justify-center rounded-md p-2">
						<legend className="text-lg font-bold">Seniority</legend>
						<div className="h-fit w-fit">
							<input
								checked={currentState.seniority === 'sr'}
								onChange={() =>
									setState(draft => {
										draft[index].seniority = 'sr';
										return draft;
									})
								}
								type="radio"
								id={`sr${id}`}
								name={`Seniroity${id}`}
								className="relative inset-x-0 mx-auto inline-block h-fit w-fit cursor-pointer"
							/>
							<label htmlFor={`sr${id}`} className="mx-1 cursor-pointer">
								Sr
							</label>
						</div>
						<div className="h-fit w-fit">
							<input
								checked={currentState.seniority === 'jr'}
								onChange={() =>
									setState(draft => {
										draft[index].seniority = 'jr';
										return draft;
									})
								}
								type="radio"
								id={`jr${id}`}
								name={`Seniroity${id}`}
								className="relative inset-x-0 mx-auto inline-block h-fit w-fit cursor-pointer"
							/>
							<label htmlFor={`jr${id}`} className="mx-1 cursor-pointer">
								Jr
							</label>
						</div>
					</fieldset>

					<fieldset className="my-border flex-col rounded-md p-2">
						<legend className="text-lg font-bold">Division</legend>
						<div className="h-fit w-fit">
							<input
								checked={currentState.div === 1}
								onChange={() =>
									setState(draft => {
										draft[index].div = 1;
										return draft;
									})
								}
								type="radio"
								id={`div1${id}`}
								name={`Division${id}`}
								className="my-border relative inset-x-0 mx-auto inline-block h-fit w-fit cursor-pointer"
							/>
							<label htmlFor={`div1${id}`} className="mx-1 cursor-pointer">
								Div 1
							</label>
						</div>
						<div className="h-fit w-fit">
							<input
								checked={currentState.div === 2}
								onChange={() =>
									setState(draft => {
										draft[index].div = 2;
										return draft;
									})
								}
								type="radio"
								id={`div2${id}`}
								name={`Division${id}`}
								className="my-border relative inset-x-0 mx-auto inline-block h-fit w-fit cursor-pointer"
							/>
							<label htmlFor={`div2${id}`} className="mx-1 cursor-pointer">
								Div 2
							</label>
						</div>
						<div className="h-fit w-fit">
							<input
								checked={currentState.div === 3}
								onChange={() =>
									setState(draft => {
										draft[index].div = 3;
										return draft;
									})
								}
								type="radio"
								id={`div3${id}`}
								name={`Division${id}`}
								className="my-border relative inset-x-0 mx-auto inline-block h-fit w-fit cursor-pointer"
							/>
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
