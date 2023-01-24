import { useState } from 'react';

const TeamInput = () => (
	<div className="w-fitp-2 flex ">
		<div className="h-48 w-full">
			<p className="text-center text-2xl font-bold">Team Info</p>
			<div className="flex gap-2">
				<div className="flex-col">
					<p className="text-center text-lg font-bold">Gender</p>
					<div className="my-border h-fit w-fit">
						<p>Boys</p>
						<input type="checkbox" className="my-border relative inset-x-0 mx-auto inline-block flex h-fit w-fit" />
					</div>
					<div className="my-border h-fit w-fit">
						<p>Girls</p>
						<input type="checkbox" className="my-border relative inset-x-0 mx-auto inline-block flex h-fit w-fit" />
					</div>
				</div>

				<div className="flex-col">
					<p className="text-center text-lg font-bold">Seniroity</p>
					<div className="my-border h-fit w-fit">
						<p>Sr</p>
						<input type="checkbox" className="my-border relative inset-x-0 mx-auto inline-block flex h-fit w-fit" />
					</div>
					<div className="my-border h-fit w-fit">
						<p>Jr</p>
						<input type="checkbox" className="my-border relative inset-x-0 mx-auto inline-block flex h-fit w-fit" />
					</div>
				</div>

				<div className="flex-col">
					<p className="text-center text-lg font-bold">Division</p>
					<div className="my-border h-fit w-fit">
						<p>Div 1</p>
						<input type="checkbox" className="my-border relative inset-x-0 mx-auto inline-block flex h-fit w-fit" />
					</div>
					<div className="my-border h-fit w-fit">
						<p>Div 2</p>
						<input type="checkbox" className="my-border relative inset-x-0 mx-auto inline-block flex h-fit w-fit" />
					</div>
					<div className="my-border h-fit w-fit">
						<p>Div 3</p>
						<input type="checkbox" className="my-border relative inset-x-0 mx-auto inline-block flex h-fit w-fit" />
					</div>
				</div>
			</div>
		</div>
	</div>
);

type SchoolInputProps = {
	id: number;
	setState: any;
	state: any;
};

const SchoolInput = ({ id, setState, state }: SchoolInputProps) => {
	const [teams, setTeams] = useState<number[]>([]);

	const enlaregeArray = () => {
		if (teams.length + 1 <= 4) {
			setTeams(prev => [...prev, 0]);
		}
	};

	const removeSelf = () => {
		const array = state;
		// const index = array.indexOf(id);
		// if (index > -1) {
		// 	// only splice array when item is found
		// 	array.splice(index, 1); // 2nd parameter means remove one item only
		// }
		array.pop();

		setState(array);
	};

	return (
		<div className="my-4 h-fit w-full">
			<button onClick={removeSelf} type="button" className="my-border my-shadow smooth-scale m-2 h-fit w-fit rounded-md bg-accent p-2 hover:scale-105 active:scale-95">
				Remove School
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
				<div className="h-full w-fit flex-col justify-center">
					<div className="my-border h-fit w-fit justify-center">
						<p>Alternate Field</p>
						<input type="checkbox" className="my-border relative inset-x-0 mx-auto inline-block flex h-fit w-fit" />
					</div>

					<div className="my-border relative inset-x-0 mx-auto flex h-fit w-fit gap-2">
						<div>
							<p>Cru</p>
							<input type="checkbox" className="my-border relative inset-x-0 mx-auto inline-block flex h-fit w-fit" />
						</div>

						<div>
							<p>Irish</p>
							<input type="checkbox" className="my-border relative inset-x-0 mx-auto inline-block flex h-fit w-fit" />
						</div>
					</div>
				</div>

				<div className="my-border h-fit w-fit">
					<p>Single Field</p>
					<input type="checkbox" className="my-border relative inset-x-0 mx-auto inline-block flex h-fit w-fit" />
				</div>

				<div className="my-border h-fit w-fit">
					<p>Double Header Field</p>
					<input type="checkbox" className="my-border relative inset-x-0 mx-auto inline-block flex h-fit w-fit" />
				</div>
			</div>
			<button onClick={enlaregeArray} type="button" className="my-border my-shadow smooth-scale relative inset-x-0 mx-auto w-fit rounded-md bg-accent p-2 hover:scale-110 active:scale-90">
				Add Team +
			</button>
			<div className="flex">
				{teams.map(() => (
					<TeamInput />
				))}
			</div>
		</div>
	);
};

const CreateData = () => {
	const [schools, setSchools] = useState<number[]>([]);

	const enlaregeArray = () => {
		setSchools(prev => [...prev, prev.at(-1) + 1]);
	};

	return (
		<div>
			<div className="flex p-2">
				<button onClick={enlaregeArray} type="button" className="my-border my-shadow smooth-scale rounded-md bg-accent p-2 hover:scale-110 active:scale-90">
					Add School +
				</button>
				{schools.length !== 0 && (
					<button type="button" className="my-border my-shadow ml-auto h-fit w-fit rounded-md bg-accent p-2 hover:scale-110 active:scale-90">
						Upload Data
					</button>
				)}
			</div>

			<div className="flex-col">
				{schools.map(elm => (
					<SchoolInput id={elm} setState={setSchools} state={schools} />
				))}
			</div>
		</div>
	);
};

export default CreateData;
