import caret from '@svg/caret.svg';

const WeekCaret = ({ top, func }: any) => (
	<button onClick={func} type="button">
		<img src={caret} alt="" className={`w-8 h-8 absolute inset-x-0 mx-auto   ${top ? 'top-[-2rem] rotate-180 ' : 'bottom-[-2rem]'} invert hover:scale-110 active:scale-90 smooth `} />
	</button>
);
export default WeekCaret;
