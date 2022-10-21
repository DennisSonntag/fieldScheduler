import { useEffect } from "react";
import { v4 as uuid } from "uuid";

import type { SelectOption } from "./Select";

const FilterChip = ({ options }: any) => {
	return (
		<>
			<div className="flex w-full h-10 gap-4 px-4 my-2 shrink-0">
				{options.map((val: SelectOption) => (
					<div key={uuid()} className="px-4 py-2 bg-light rounded-full w-fit h-fit delay-75 ">
						{val.label}
					</div>
				))}
			</div>
		</>
	);
};

export default FilterChip;
