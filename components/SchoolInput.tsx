import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Crypto } from '@peculiar/webcrypto';
import Image from 'next/image';
import { DivType } from 'pages/api/calculate';
import { possibleData } from 'pages/main';
import { useState, useEffect, useId, FC } from 'react';
import { useImmer, Updater } from 'use-immer';

import plus from '@svg/add.svg';
import remove from '@svg/remove.svg';

import Button from './Button';
import Chip from './Chip';
import { SchoolInputType } from './CreateData';
import DatePicker from './DatePicker';
import TeamInput from './TeamInput';

const crypto = new Crypto();

type PropTypes = {
	setState: Updater<SchoolInputType[]>;
	currentState: SchoolInputType;
	index: number;
};

export type GenderType = 'boy' | 'girl';
export type SeniorityType = 'sr' | 'jr';

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
			if (index > -1) draft.splice(index, 1);
		});
	};

	const [altActive, setAltActive] = useState(false);

	const id = useId();

	const [animateRef] = useAutoAnimate<HTMLDivElement>();

	useEffect(() => {
		setState(draft => {
			draft[index].teams = teams;
			return draft;
		});
	}, [teams]);

	const [dates, setDates] = useImmer<string[]>([]);

	useEffect(() => {
		setState(draft => {
			draft[index].blackoutDates = dates.map(elm => new Date(elm));
		});
	}, [dates]);

	const possibleSchools = Object.values(possibleData);
	const getKeyByValue = (object: any, value: any) => Object.keys(object).find(key => object[key] === value);

	return (
		<div className="my-border my-shadow relative inset-x-0 my-4 mx-auto h-fit w-[90%] rounded-md bg-main p-4">
			<Button onClick={removeSelf} className="absolute top-2 right-2">
				<Image className="h-4 w-4" src={remove} alt="remove icon" />
			</Button>
			<p className="text-center text-2xl font-bold">School {currentState.id} Info</p>

			<div className="flex h-fit w-full justify-center gap-4 ">
				<datalist id="school-list">
					{possibleSchools.map(school => (
						<option key={crypto.randomUUID()} aria-label="school-entry" value={school} />
					))}
				</datalist>
				<input
					value={currentState.name || ''}
					onChange={e =>
						setState(draft => {
							draft[index].name = e.target.value;
							return draft;
						})
					}
					className="my-border my-shadow rounded-md bg-accent p-2 text-center hover:bg-accent-light"
					type="search"
					list="school-list"
					placeholder="Name"
				/>
				<input
					value={getKeyByValue(possibleData, currentState.name) || currentState.code || ''}
					onChange={e =>
						setState(draft => {
							draft[index].code = e.target.value;
							return draft;
						})
					}
					className="my-border my-shadow rounded-md bg-accent p-2 text-center hover:bg-accent-light"
					type="text"
					placeholder="Code"
				/>
			</div>

			<p className="my-2 text-center text-2xl font-bold">Blackout Dates</p>
			<div className="my-2 flex h-fit w-full flex-col justify-center gap-4">
				<DatePicker
					onChange={e => {
						if (e.currentTarget !== null) {
							const dateInner = new Date(e.currentTarget.value);
							dateInner.setTime(dateInner.getTime() + 1 * 86400000);
							setState(draft => {
								draft[index].blackoutDates?.push(dateInner);
								setDates(draft[index].blackoutDates?.map(elm => elm.toDateString()) || []);
								return draft;
							});
						}
					}}
				/>
				<div className="relative h-fit w-full">
					<Chip setState={setDates} removeable list={currentState.blackoutDates?.map(elm => elm.toDateString()) || []} />
				</div>
			</div>

			<p className="text-center text-2xl font-bold">Field Info</p>
			<div className="flex h-fit w-full justify-center gap-4">
				<div className="h-full w-fit flex-col justify-center">
					<div className="my-border flex h-fit w-fit items-center rounded-md p-2 my-shadow bg-main hover:bg-main-light active:scale-95 smooth-scale no-move">
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
							className="my-border relative inset-x-0 mx-auto inline-block h-fit w-fit cursor-pointer "
						/>

						<label htmlFor={`af${id}`} className="mx-2 cursor-pointer">
							Alternate Field
						</label>
					</div>

					{altActive && (
						<div className="my-border relative inset-x-0 m-2 mx-auto flex h-fit w-fit items-center gap-2 rounded-md p-2 my-shadow bg-main hover:bg-main-light no-move">
							<div className="flex items-center ">
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
								<label htmlFor="cru" className="mx-2 cursor-pointer hover:text-invert smooth-scale">
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
								<label htmlFor="irish" className="mx-2 cursor-pointer hover:text-invert smooth-scale">
									Irish
								</label>
							</div>
						</div>
					)}
				</div>

				<div className="my-border my-shadow flex h-fit w-fit items-center rounded-md p-2 bg-main hover:bg-main-light no-move">
					<input
						checked={currentState.fieldType === 'none'}
						onChange={() => {
							setAltActive(false);
							setState(draft => {
								draft[index].fieldType = 'none';
								return draft;
							});
						}}
						type="radio"
						id={`nof${id}`}
						name={`field${id}`}
						className="my-border relative inset-x-0 mx-auto inline-block h-fit w-fit cursor-pointer"
					/>
					<label htmlFor={`nof${id}`} className="mx-2 cursor-pointer">
						No Field
					</label>
				</div>
				<div className="my-border flex h-fit w-fit items-center rounded-md p-2 my-shadow bg-main hover:bg-main-light no-move">
					<input
						checked={currentState.fieldType === 'single'}
						onChange={() => {
							setAltActive(false);
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
				<div className="my-border my-shadow flex h-fit w-fit items-center rounded-md p-2 bg-main hover:bg-main-light no-move">
					<input
						checked={currentState.fieldType === 'double'}
						onChange={() => {
							setAltActive(false);
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
			<Button text="Add Team" onClick={enlaregeArray} className="my-4 mx-auto flex gap-2">
				<Image className="h-6 w-6" src={plus} alt="add icon" />
			</Button>

			<div ref={animateRef} className="flex justify-center gap-4">
				{teams.map((elm, indexArg) => (
					<TeamInput key={elm.id} currentState={elm} setState={setTeams} index={indexArg} />
				))}
			</div>
		</div>
	);
};
export default SchoolInput;
