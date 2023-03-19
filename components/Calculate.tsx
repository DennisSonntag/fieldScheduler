import { useAtom } from 'jotai';
import { RugbyScheduleAtom, SoccerScheduleAtom, SportType, startEndDateAtom, TeamInfoAtom } from 'pages/main';
import { FC } from 'react';

import generateSchedule, { AltField, DivType, FieldType, Team, TeamType, TeamTypes, FieldTypes, AltFields } from '@ts/matchUp';

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
		const teams: Team[] = teamData.map((elm, index) => ({
			schoolName: elm.school as string,
			teamType: TeamTypes[elm.type - 1] as TeamType,
			skillDivision: elm.div as DivType,
			field: FieldTypes[Math.floor((index * 3) / teamData.length)] as FieldType,
			// field: 'single',
			alternateFields: AltFields[Math.floor((index * 2) / teamData.length)] as AltField,
			gamesPlayed: 0,
			opponents: [],
		}));
		const unavailableDates: Date[] = [
			/* array of dates */
		];
		// Number of referees
		const maxGamesPerDay: number = 10;
		const [startDate, endDate] = startEndDate;
		const result = generateSchedule(teams, maxGamesPerDay, unavailableDates, startDate, endDate);

		if (sportType === 'rugby') {
			setRugbyGameData(result);
		} else if (sportType === 'soccer') {
			setSoccerGameData(result);
		}
	};

	return <Button onClick={handleClickCalculate} text="Calculate Schedule " />;
};

export default Calculate;
