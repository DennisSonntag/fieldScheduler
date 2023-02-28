import { useState, useId, FC } from 'react';
import Image from 'next/image';
import remove from '@svg/remove.svg';
import plus from '@svg/add.svg';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import TeamInput from './TeamInput';

type PropTypes = {
	setState: any;
	state: any;
};

const SchoolInput: FC<PropTypes> = ({ setState, state }) => {
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
export default SchoolInput;
