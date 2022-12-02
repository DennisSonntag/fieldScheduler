import seasonIcon from '@svg/year.svg';
import monthIcon from '@svg/calendar.svg';
import weekIcon from '@svg/week.svg';
import dayIcon from '@svg/day.svg';
import Image from 'next/image';

type PropType = {
	setIconState: () => void;
	iconNum: number;
};

const ViewBtn = ({ setIconState, iconNum }: PropType) => {
	const icons = [seasonIcon, monthIcon, weekIcon, dayIcon];
	const texts = ['Season', 'Month', 'Week', 'Day'];
	return (
		<button onClick={setIconState} type="button" className=" no-move smooth absolute top-0 left-0 m-2 h-fit w-fit hover:scale-110 active:scale-90">
			<div className="flex items-center gap-2">
				<Image className="inv-1 no-move h-8 w-8 " src={icons[iconNum]} alt="" />
				<p className=" h-fit w-fit font-bold text-base">{texts[iconNum]}</p>
			</div>
		</button>
	);
};
export default ViewBtn;
