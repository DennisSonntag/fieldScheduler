import type { SelectOption } from "./Select";
import { v4 as uuid } from "uuid";

const FilterChip = ({options}:any) => {
	return (
		<>
			<div className="w-full h-10 my-2 shrink-0 flex gap-4 px-4">
				{options.map((val: SelectOption) => (
					<div key={uuid()} className="bg-white w-fit h-fit px-4 py-2 rounded-full">{val.label}</div>
				))}
			</div>
		</>
	);
};

export default FilterChip;
