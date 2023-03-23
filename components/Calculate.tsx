/* eslint-disable no-restricted-syntax */
import { useAtom } from 'jotai';
import { Game } from 'pages/api/calculate';
import { AltFieldAvailabilityAtom, RefNumAtom, RugbyScheduleAtom, SoccerScheduleAtom, SportType, StartEndDateAtom, TeamInfoAtom } from 'pages/main';
import { FC, useState } from 'react';

import Button from './Button';

type PropTypes = {
	sportType: SportType;
};

const Calculate: FC<PropTypes> = ({ sportType }) => {
	const [startEndDate] = useAtom(StartEndDateAtom);
	const [refNum] = useAtom(RefNumAtom);
	const [altFieldAvailability] = useAtom(AltFieldAvailabilityAtom);
	const setRugbyGameData = useAtom(RugbyScheduleAtom)[1];
	const setSoccerGameData = useAtom(SoccerScheduleAtom)[1];
	const [teamData] = useAtom(TeamInfoAtom);
	const [loading, setLoading] = useState(false);

	const handleClickCalculate = async () => {
		setLoading(true);
		const resultRaw = await fetch('/api/calculate', {
			method: 'post',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},

			// make sure to serialize your JSON body
			body: JSON.stringify({
				team_data: teamData,
				ref_num: refNum,
				start_end_date: startEndDate,
				alt_field_availability: altFieldAvailability,
			}),
		});
		try {
			const result = (await resultRaw.json()) as { schedule: Game[] };
			console.log(result);

			if (sportType === 'rugby') {
				setRugbyGameData(result.schedule);
				setLoading(false);
			} else if (sportType === 'soccer') {
				setSoccerGameData(result.schedule);
				setLoading(false);
			}
		} catch (err) {
			console.log(err);
		}
	};

	return <Button onClick={handleClickCalculate} text={loading ? 'loading...' : 'Calculate Schedule '} className="font-bold text-lg" />;
};

export default Calculate;
