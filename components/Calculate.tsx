import { useAtom } from 'jotai';
import { Game } from 'pages/api/calculate';
import { RugbyScheduleAtom, SoccerScheduleAtom, SportType, startEndDateAtom, TeamInfoAtom } from 'pages/main';
import { FC } from 'react';

import Button from './Button';

type PropTypes = {
	sportType: SportType;
};

const Calculate: FC<PropTypes> = ({ sportType }) => {
	const [startEndDate] = useAtom(startEndDateAtom);
	const setRugbyGameData = useAtom(RugbyScheduleAtom)[1];
	const setSoccerGameData = useAtom(SoccerScheduleAtom)[1];
	const [teamData] = useAtom(TeamInfoAtom);

	const handleClickCalculate = async () => {
		const resultRaw = await fetch('/api/calculate', {
			method: 'post',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},

			// make sure to serialize your JSON body
			body: JSON.stringify({
				team_data: teamData,
				start_end_date: startEndDate,
			}),
		});

		const result = (await resultRaw.json()) as { schedule: Game[] };

		if (sportType === 'rugby') {
			setRugbyGameData(result.schedule);
		} else if (sportType === 'soccer') {
			setSoccerGameData(result.schedule);
		}
	};

	return <Button onClick={handleClickCalculate} text="Calculate Schedule " />;
};

export default Calculate;
