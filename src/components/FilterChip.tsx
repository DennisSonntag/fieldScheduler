import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

import type { SelectOption } from "./Select";

const FilterChip = ({ options, selected }: any) => {

	const [change, setChange] = useState(false)
	useEffect(() => {
		if (selected.length !== 0) {
			const thing = selected[selected.length - 1].label
			document.getElementById(thing)?.classList.add("slide-in")
		}
	}, [selected])
	
	
	return (
		<>
			<div className="flex w-full h-10 gap-4 px-4 my-2 shrink-0 bg-red">
				{options.map((val: SelectOption) => (
					<div id={val.label} className="px-4 py-2 bg-light idk rounded-full w-fit h-fit delay-75 translate-x-[25rem] ">
						{val.label}
					</div>
				))}
			</div>
		</>
	);
};

export default FilterChip;
