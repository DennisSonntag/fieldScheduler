import { useAutoAnimate } from '@formkit/auto-animate/react';
import Image from 'next/image';
import { FC } from 'react';
import { Updater } from 'use-immer';

import remove from '@svg/remove.svg';

type PropType = {
	list: string[];
	removeable?: boolean;
	setState?: Updater<string[]>;
};

const Chip: FC<PropType> = ({ list, removeable, setState }) => {
	const [animateRef] = useAutoAnimate<HTMLDivElement>();
	const removeSelf = (elm: string) => {
		if (setState !== undefined) {
			setState(draft => {
				const index = list.indexOf(elm);
				if (index > -1) {
					draft.splice(index, 1);
				}
			});
		}
	};

	return (
		<div ref={animateRef} className={` flex w-full ${list.length === 0 ? 'hidden h-0' : 'h-10'} smooth my-1 shrink-0 gap-4 px-4`}>
			{list.map((val: string) => (
				<div key={val} id={val} className="smooth my-shadow my-border flex h-fit w-fit items-center gap-2 rounded-full bg-main px-4 py-2 text-invert">
					<p>{val}</p>
					{removeable && (
						<button type="button" onClick={() => removeSelf(val)} className="smooth-scale my-border h-fit w-fit rounded-full bg-accent p-2 hover:scale-110 active:scale-90">
							<Image className="h-3 w-3" src={remove} alt="remove icon" />
						</button>
					)}
				</div>
			))}
		</div>
	);
};
export default Chip;
