import { cloneElement, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

import type { SelectOption } from "./Select";

const FilterChip = ({ options, selected }: any) => {
	const [empty, setEmpty] = useState(true);
	const [done, setDone] = useState(false);

	useEffect(() => {
		if (selected.length !== 0) {
			const id = selected[selected.length - 1].label;
			// document.getElementById(thing)?.classList.add("slide-in")
			document.getElementById(id)?.classList.remove("translate-x-[20rem]");
			// setEmpty(false);
			// if (done) {
			// 	const id = selected[selected.length - 1].label;
			// 	// document.getElementById(thing)?.classList.add("slide-in")
			// 	document.getElementById(id)?.classList.remove("translate-x-[20rem]");
			// }
			// setDone(false);
		}
	}, [selected]);

	let hidden = options.map((val: SelectOption) => (
		<div onAnimationEnd={() => setDone(true)} key={uuid()} id={val.label} className="px-4 py-2 bg-light idk rounded-full w-fit h-fit smooth translate-x-[20rem]">
			{val.label}
		</div>
	));

	let visible = options.map((val: SelectOption) => (
		<div onAnimationEnd={() => setDone(true)} key={uuid()} id={val.label} className="px-4 py-2 bg-light idk rounded-full w-fit h-fit smooth ">
			{val.label}
		</div>
	));

	return (
		<>
			<div className={`flex w-full ${empty ? "h-0" : "h-10"} gap-4 px-4 my-1 shrink-0 smooth`}>
				{hidden.map((element: any, index: number) => {
					if (selected.length !== 0) {
						const id = selected[selected.length - 1].label;
						const text = document.getElementById(id)?.innerText;
						const idk = visible.map((elm: any) => elm.props.id);
						if (index === idk.indexOf(text)) {
							return visible[idk.indexOf(text)];
						}
					}

					return element;
				})}
			</div>
		</>
	);
};

export default FilterChip;
