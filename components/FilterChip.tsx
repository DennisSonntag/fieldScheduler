import { useEffect, useState } from 'react';

const FilterChip = ({ selected }: any) => {
	const [empty, setEmpty] = useState(true);

	useEffect(() => {
		if (selected.length !== 0) {
			setEmpty(false);
		}
	}, [selected]);

	return (
		<div className={` flex w-full ${empty ? 'h-0' : 'h-10'} smooth my-1 shrink-0 gap-4 px-4`}>
			{selected.map((val: any) => (
				<div key={val} id={val.label} className="smooth h-fit w-fit rounded-full bg-base px-4 py-2 text-stark">
					{val.label}
				</div>
			))}
		</div>
	);
};
export default FilterChip;