import caret from '@svg/caret.svg';
import Image from 'next/image';

type PropType = {
	func: () => void;
	top?: boolean;
}
const WeekCaret = ({ top = false, func }: PropType) => (
	<button onClick={func} type="button">
		<Image src={caret} alt="" className={`absolute inset-x-0 mx-auto h-8 w-8 ${top ? 'top-[-2rem] rotate-180 ' : 'bottom-[-2rem]'} smooth inv-1 hover:scale-110 active:scale-90 `} />
	</button>
);
export default WeekCaret;
