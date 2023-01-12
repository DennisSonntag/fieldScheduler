import caret from '@svg/caret.svg';
import Image from 'next/image';
import { FC } from 'react';

type PropType = {
	func: () => void;
	top?: boolean;
};

const WeekCaret: FC<PropType> = ({ top = false, func }) => (
	<button onClick={func} type="button">
		<Image src={caret} alt="" className={`absolute inset-x-0 mx-auto h-8 w-8 ${top ? 'top-[-2rem] rotate-180 ' : 'bottom-[-3rem]'} smooth inv hover:scale-110 active:scale-90 `} />
	</button>
);
export default WeekCaret;
