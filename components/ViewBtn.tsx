import monthIcon from '@svg/calendar.svg';
import seasonIcon from '@svg/year.svg';
import weekIcon from '@svg/week.svg';
import dayIcon from '@svg/day.svg';
import Image from 'next/image';

type PropType = {
	setPrevState: (e: any) => void;
	setNextState: () => void;
	iconNum: number;
};

const ViewBtn = ({ setNextState, setPrevState, iconNum }: PropType) => {
	const icons = [seasonIcon, monthIcon, weekIcon, dayIcon];
	const texts = ['Season', 'Month', 'Week', 'Day'];
	return (
		<button onContextMenu={setPrevState} onClick={setNextState} type="button" className="my-border my-shadow no-move smooth-scale absolute top-0 left-0 m-2 h-fit w-fit rounded-md bg-accent p-2 hover:scale-110 active:scale-90">
			<div className="flex items-center gap-2">
				<Image className="inv-1 no-move h-8 w-8" src={icons[iconNum]} alt="" />
				<p className=" h-fit w-fit font-bold text-stark">{texts[iconNum]}</p>
			</div>
		</button>
	);
};
export default ViewBtn;
