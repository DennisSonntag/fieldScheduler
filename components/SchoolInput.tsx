import { useAutoAnimate } from '@formkit/auto-animate/react';
import Image from 'next/image';
import { useState, useEffect, useId, FC } from 'react';
import { useImmer, Updater } from 'use-immer';

import plus from '@svg/add.svg';
import remove from '@svg/remove.svg';

import Chip from './Chip';
import { SchoolInputType } from './CreateData';
import TeamInput from './TeamInput';

type PropTypes = {
	setState: Updater<SchoolInputType[]>;
	currentState: SchoolInputType;
	index: number;
};

type GenderType = 'boy' | 'girl';
type SeniorityType = 'sr' | 'jr';
type DivType = 1 | 2 | 3;

export type TeamInputType = {
	gender?: GenderType;
	seniority?: SeniorityType;
	div?: DivType;
	id: number;
};

const SchoolInput: FC<PropTypes> = ({ setState, currentState, index }) => {
	const [teams, setTeams] = useImmer<TeamInputType[]>([]);

	const enlaregeArray = () => {
		if (teams.length + 1 <= 4) {
			setTeams(draft => {
				const last = draft.at(-1);
				if (last === undefined) {
					draft.push({ id: 0 });
				} else {
					draft.push({ id: last.id + 1 });
				}
			});
		}
	};
	const removeSelf = () => {
		setState(draft => {
			if (index > -1) {
				draft.splice(index, 1);
			}
		});
	};

	const [altActive, setAltActive] = useState(false);

	const id = useId();

	const [animateRef] = useAutoAnimate<HTMLDivElement>();

	const [dates, setDates] = useImmer<string[]>([]);

	useEffect(() => {
		setState(draft => {
			draft[index].teams = teams;
			return draft;
		});
	}, [teams]);

	return (
		<div className="my-border my-shadow relative inset-x-0 my-4 mx-auto h-fit w-[90%] rounded-md bg-main p-4">
			<button type="button" onClick={removeSelf} className="smooth-scale my-border absolute top-2 right-2 h-fit w-fit rounded-md bg-accent p-2 hover:scale-110 active:scale-90">
				<Image className="h-4 w-4" src={remove} alt="remove icon" />
			</button>
			<p className="text-center text-2xl font-bold">School {currentState.id} Info</p>

			<div className="flex h-fit w-full justify-center gap-4">
				<input
					value={currentState.name || ''}
					onChange={e =>
						setState(draft => {
							draft[index].name = e.target.value;
							return draft;
						})
					}
					className="my-border my-shadow rounded-md bg-accent p-2 text-center"
					type="text"
					placeholder="Name"
				/>
				<input
					value={currentState.code || ''}
					onChange={e =>
						setState(draft => {
							draft[index].code = e.target.value;
							return draft;
						})
					}
					className="my-border my-shadow rounded-md bg-accent p-2 text-center"
					type="text"
					placeholder="Code"
				/>
			</div>

			<p className="my-2 text-center text-2xl font-bold">Blackout Dates</p>
			<div className="my-2 flex h-fit w-full flex-col justify-center gap-4">
				<input
					type="date"
					className="smooth-scale my-border my-shadow relative inset-x-0 mx-auto h-fit w-fit rounded-md bg-accent p-2 text-center hover:bg-accent-light"
					onChange={e =>
						setDates(draft => {
							const date = e.target.valueAsDate;
							if (date !== null) {
								draft.push((date as Date).toDateString());
							}
							return draft;
						})
					}
				/>
				<div className="relative h-fit w-full">
					<Chip setState={setDates} removeable list={dates} />
				</div>
			</div>

			<p className="text-center text-2xl font-bold">Field Info</p>
			<div className="flex h-fit w-full justify-center gap-4">
				<div ref={animateRef} className="h-full w-fit flex-col justify-center">
					<div className="my-border flex h-fit w-fit items-center rounded-md p-2">
						<input
							checked={currentState.fieldType === 'alt'}
							onChange={() => {
								setAltActive(true);
								setState(draft => {
									draft[index].fieldType = 'alt';
									return draft;
								});
							}}
							type="radio"
							id={`af${id}`}
							name={`field${id}`}
							className="my-border relative inset-x-0 mx-auto inline-block h-fit w-fit cursor-pointer"
						/>

						<label htmlFor={`af${id}`} className="mx-2 cursor-pointer">
							Alternate Field
						</label>
					</div>

					{altActive && (
						<div className="my-border relative inset-x-0 m-2 mx-auto flex h-fit w-fit items-center gap-2 rounded-md p-2">
							<div className="flex items-center">
								<input
									checked={currentState.altField === 'cru'}
									onChange={() => {
										setAltActive(true);
										setState(draft => {
											draft[index].altField = 'cru';
											return draft;
										});
									}}
									type="radio"
									id="cru"
									name="alt"
									className="my-border relative inset-x-0 mx-auto inline-block h-fit w-fit cursor-pointer"
								/>
								<label htmlFor="cru" className="mx-2 cursor-pointer">
									Cru
								</label>
							</div>

							<div className="flex items-center">
								<input
									checked={currentState.altField === 'irish'}
									onChange={() => {
										setAltActive(true);
										setState(draft => {
											draft[index].altField = 'irish';
											return draft;
										});
									}}
									type="radio"
									id="irish"
									name="alt"
									className="my-border relative inset-x-0 mx-auto inline-block h-fit w-fit cursor-pointer"
								/>
								<label htmlFor="irish" className="mx-2 cursor-pointer">
									Irish
								</label>
							</div>
						</div>
					)}
				</div>

				<div className="my-border flex h-fit w-fit items-center rounded-md p-2">
					<input
						checked={currentState.fieldType === 'single'}
						onChange={() => {
							setAltActive(true);
							setState(draft => {
								draft[index].fieldType = 'single';
								return draft;
							});
						}}
						type="radio"
						id={`sf${id}`}
						name={`field${id}`}
						className="my-border relative inset-x-0 mx-auto inline-block h-fit w-fit cursor-pointer"
					/>
					<label htmlFor={`sf${id}`} className="mx-2 cursor-pointer">
						Single Field
					</label>
				</div>

				<div className="my-border my-shadow flex h-fit w-fit items-center rounded-md p-2">
					<input
						checked={currentState.fieldType === 'double'}
						onChange={() => {
							setAltActive(true);
							setState(draft => {
								draft[index].fieldType = 'double';
								return draft;
							});
						}}
						type="radio"
						id={`dhf${id}`}
						name={`field${id}`}
						className="my-border relative inset-x-0 mx-auto inline-block h-fit w-fit cursor-pointer"
					/>
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
				{teams.map((elm, indexArg) => (
					<TeamInput currentState={elm} setState={setTeams} index={indexArg} />
				))}
			</div>
		</div>
	);
};
export default SchoolInput;
