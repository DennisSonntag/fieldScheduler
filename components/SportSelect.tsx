import { useAtom } from 'jotai';
import { SportTypeAtom } from 'pages/main';
import { FC } from 'react';

import Button from './Button';

type PropType = {
	sport: string;
	setActivePage: () => void;
	activePage: boolean;
};

const SportSelect: FC<PropType> = ({ activePage, setActivePage, sport }) => {
	const setSportType = useAtom(SportTypeAtom)[1];

	return (
		<Button title={`${sport} page`} onClick={setActivePage} className={`${activePage ? 'bg-main hover:bg-main-light' : 'bg-accent'} ${sport === 'Rugby' ? 'origin-top-right rounded-bl-[1.5rem]' : 'origin-top-left rounded-br-[1.5rem]'} h-[2.5rem] w-[16rem] relative `}>
			<h1 className={`${activePage ? 'text-invert' : 'text-stark'} absolute inset-0 m-auto inline-block h-fit w-fit text-lg font-bold`}>{sport}</h1>
		</Button>
	);
};

export default SportSelect;
