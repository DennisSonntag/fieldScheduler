import type { SelectOption } from "./Select";
import { v4 as uuid } from "uuid";

const FilterChip = ({options}:any) => {
	return (
		<>
			<div className="flex w-full h-10 gap-4 px-4 my-2 shrink-0">
				{options.map((val: SelectOption) => (
					<div key={uuid()} className="px-4 py-2 bg-white rounded-full w-fit h-fit">{val.label}</div>
				))}
			</div>
		</>
	);
};

export default FilterChip;
