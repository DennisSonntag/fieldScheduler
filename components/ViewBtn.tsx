import Image from 'next/image';
import { FC } from 'react';

import monthIcon from '@svg/calendar.svg';
import dayIcon from '@svg/day.svg';
import weekIcon from '@svg/week.svg';
import seasonIcon from '@svg/year.svg';

import Button from './Button';

type PropType = {
	setPrevState: (e: any) => void;
	setNextState: () => void;
	iconNum: number;
};

const ViewBtn: FC<PropType> = ({ setNextState, setPrevState, iconNum }) => {
	const icons = [seasonIcon, monthIcon, weekIcon, dayIcon];
	const texts = ['Season', 'Month', 'Week', 'Day'];
	return (
		<Button onContextMenu={setPrevState} onClick={setNextState}>
			<div className="flex items-center gap-2">
				<Image className="inv-1 no-move h-8 w-8" src={icons[iconNum]} alt="" />
				<p className=" h-fit w-fit font-bold text-stark">{texts[iconNum]}</p>
			</div>
		</Button>
	);
};
export default ViewBtn;
