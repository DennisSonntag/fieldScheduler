import { cloneElement, JSXElementConstructor, ReactElement, ReactFragment, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

import type { SelectOption } from "./Select";

const FilterChip = ({ options, selected }: any) => {
	const [empty, setEmpty] = useState(true);

	useEffect(() => {
		if (selected.length !== 0) {
			setEmpty(false);
		}
	}, [selected]);


	return (
		<>
			<div className={`flex w-full ${empty ? "h-0" : "h-10"} gap-4 px-4 my-1 shrink-0 smooth`}>
				{selected.map((val: any) => (
					<div  key={uuid()} id={val.label} className="px-4 py-2 bg-light idk rounded-full w-fit h-fit smooth">
						{val.label}
					</div>
				))}
			</div>
		</>
	);
};

export default FilterChip;
