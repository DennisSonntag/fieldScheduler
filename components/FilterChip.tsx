import { useEffect, useState } from 'react';

type PropType = {
	selected: string[];
};
const FilterChip = ({ selected }: PropType) => {
	const [empty, setEmpty] = useState(true);

	useEffect(() => {
		if (selected.length !== 0) {
			setEmpty(false);
		} else {
			setEmpty(true);
		}
	}, [selected]);

	return (
		<div className={` flex w-full ${empty ? 'h-0' : 'h-10'} smooth my-1 shrink-0 gap-4 px-4`}>
			{selected.map((val: string) => (
				<div key={val} id={val} className="smooth h-fit w-fit rounded-full bg-base px-4 py-2 text-stark">
					{val}
				</div>
			))}
		</div>
	);
};
export default FilterChip;
