import { useState, useId, Dispatch, SetStateAction, FC } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import Image from 'next/image';
import plus from '@svg/add.svg';
import remove from '@svg/remove.svg';

type TeamInputProps = {
	index: number;
	setState: Dispatch<SetStateAction<number[]>>;
	state: number[];
};

const TeamInput: FC<TeamInputProps> = ({ index, setState, state }) => {
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

				<button type="button" onClick={removeSelf} className="smooth-scale my-border absolute top-2 right-2 h-fit w-fit rounded-md bg-accent p-2 hover:scale-110 active:scale-90">
					<Image className="h-3 w-3" src={remove} alt="remove icon" />
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

type SchoolInputProps = {
	setState: any;
	state: any;
};

const SchoolInput = ({ setState, state }: SchoolInputProps) => {
	const [teams, setTeams] = useState<number[]>([]);

	const enlaregeArray = () => {
		if (teams.length + 1 <= 4) {
			if (teams.length === 0) {
				setTeams(prev => [...prev, 0]);
			} else {
				setTeams(prev => [...prev, prev[prev.length - 1] + 1]);
			}
		}
	};

	const removeSelf = () => {
		const array = [...state];
		// const index = array.indexOf(id);
		// if (index > -1) {
		// 	// only splice array when item is found
		// 	array.splice(index, 1); // 2nd parameter means remove one item only
		// }
		array.pop();

		setState(array);
	};

	const [altActive, setAltActive] = useState(false);

	const id = useId();

	const [animateRef] = useAutoAnimate<HTMLDivElement>();

	return (
		<div className="my-border my-shadow relative inset-x-0 my-4 mx-auto h-fit w-[90%] rounded-md bg-main p-4">
			<button type="button" onClick={removeSelf} className="smooth-scale my-border absolute top-2 right-2 h-fit w-fit rounded-md bg-accent p-2 hover:scale-110 active:scale-90">
				<Image className="h-4 w-4" src={remove} alt="remove icon" />
			</button>
			<p className="text-center text-2xl font-bold">School Info</p>

			<div className="flex h-fit w-full justify-center gap-4">
				<input className="my-border my-shadow rounded-md bg-accent p-2 text-center text-stark" type="text" placeholder="Name" />
				<input className="my-border my-shadow rounded-md bg-accent p-2 text-center text-stark" type="text" placeholder="Code" />
			</div>

			<p className="text-center text-2xl font-bold">Blackout Dates</p>
			<div className="flex h-fit w-full justify-center gap-4">
				<input type="date" />
			</div>

			<p className="text-center text-2xl font-bold">Field Info</p>
			<div className="flex h-fit w-full justify-center gap-4">
				<div ref={animateRef} className="h-full w-fit flex-col justify-center">
					<div className="my-border h-fit w-fit justify-center rounded-md p-2">
						<input onChange={e => setAltActive(e.target.value === 'on')} type="radio" id={`af${id}`} name={`field${id}`} className="my-border relative inset-x-0 mx-auto inline-block h-fit w-fit cursor-pointer" />
						<label htmlFor={`af${id}`} className="mx-2 cursor-pointer">
							Alternate Field
						</label>
					</div>

					{altActive && (
						<div className="my-border relative inset-x-0 m-2 mx-auto flex h-fit w-fit gap-2 rounded-md p-2">
							<div>
								<input type="radio" id="cru" name="alt" className="my-border relative inset-x-0 mx-auto inline-block h-fit w-fit cursor-pointer" />
								<label htmlFor="cru" className="mx-2 cursor-pointer">
									Cru
								</label>
							</div>

							<div>
								<input type="radio" id="irish" name="alt" className="my-border relative inset-x-0 mx-auto inline-block h-fit w-fit cursor-pointer" />
								<label htmlFor="irish" className="mx-2 cursor-pointer">
									Irish
								</label>
							</div>
						</div>
					)}
				</div>

				<div className="my-border h-fit w-fit justify-center rounded-md p-2">
					<input onChange={e => setAltActive(!(e.target.value === 'on'))} type="radio" id={`sf${id}`} name={`field${id}`} className="my-border relative inset-x-0 mx-auto inline-block h-fit w-fit cursor-pointer" />
					<label htmlFor={`sf${id}`} className="mx-2 cursor-pointer">
						Single Field
					</label>
				</div>

				<div className="my-border h-fit w-fit justify-center rounded-md p-2">
					<input onChange={e => setAltActive(!(e.target.value === 'on'))} type="radio" id={`dhf${id}`} name={`field${id}`} className="my-border relative inset-x-0 mx-auto inline-block h-fit w-fit cursor-pointer" />
					<label htmlFor={`dhf${id}`} className="mx-2 cursor-pointer">
						Double Header Field
					</label>
				</div>
			</div>
			<button onClick={enlaregeArray} type="button" className="no-move my-border my-shadow smooth-scale my-4 mx-auto flex gap-2 rounded-md bg-accent p-2 hover:scale-110 active:scale-90">
				<p>Add Team</p>
				<Image className="h-6 w-6" src={plus} alt="add icon" />
			</button>

			<div ref={animateRef} className="flex justify-center gap-4">
				{teams.map(elm => (
					<TeamInput state={teams} setState={setTeams} index={elm} />
				))}
			</div>
		</div>
	);
};

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
				{schools
					.slice()
					.reverse()
					.map(() => (
						<SchoolInput setState={setSchools} state={schools} />
					))}
			</div>
		</div>
	);
};

export default CreateData;
