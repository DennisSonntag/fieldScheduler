import { NextApiRequest, NextApiResponse } from 'next';
import { TeamPropType } from 'pages/main';
import seedrandom from 'seedrandom';

/* eslint-disable no-restricted-syntax */

/* eslint-disable no-continue */

/* eslint-disable @typescript-eslint/no-loop-func */

/* eslint-disable no-constant-condition */

export const TeamTypes = ['srBoys', 'jrBoys', 'srGirls', 'jrGirls'] as const;
export type TeamType = (typeof TeamTypes)[number];

export const DivTypes = [1, 2, 3] as const;
export type DivType = (typeof DivTypes)[number];

export const FieldTypes = ['none', 'single', 'double'] as const;
export type FieldType = (typeof FieldTypes)[number];

export const AltFields = ['cru', 'irish'] as const;
export type AltField = (typeof AltFields)[number];

export type Team = {
	schoolName: string;
	teamType: TeamType;
	skillDivision: DivType;
	field: FieldType;
	alternateFields?: AltField;
	gamesPlayed: number;
	opponents: string[];
};

type TimeType = '04:45 PM' | '06:00 PM';

export type Game = {
	date: Date;
	time: TimeType;
	homeTeam: Team;
	awayTeam: Team;
};

// Helper function to check if a date is on a weekend
const isWeekend = (date: Date): boolean => {
	const day = date.getUTCDay();
	return day === 0 || day === 6;
};

// Helper function to check if a date is unavailable
const isUnavailable = (date: Date, unavailableDates: Date[]): boolean => {
	return unavailableDates.some(unavailableDate => {
		return unavailableDate.getUTCFullYear() === date.getUTCFullYear() && unavailableDate.getUTCMonth() === date.getUTCMonth() && unavailableDate.getUTCDate() === date.getUTCDate();
	});
};

export const getDaysInMonth = (yearArg: number, monthArg: number) => new Date(yearArg, monthArg, 0).getDate();

const days: number[] = [];
for (let i = 0; i < 6; i++) {
	for (let j = 1; j <= getDaysInMonth(2022, 2 + i); j++) {
		days.push(j);
	}
}

const weekFromDay = (day: Date): number => {
	const date = new Date(new Date(day).getTime());
	date.setHours(0, 0, 0, 0);
	// Thursday in current week decides the year.
	date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
	// January 4 is always in week 1.
	const week1 = new Date(date.getFullYear(), 0, 4);
	// Adjust to Thursday in week 1 and count number of weeks from date to week1.
	return 1 + Math.round(((new Date(date).getTime() - week1.getTime()) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7);
};

const getWeek = (date: Date): number[] => {
	const week = weekFromDay(date);

	const result: number[] = [];
	for (let i = 0; i < 7; i++) {
		result[i] = days[26 + (i + 7 * week)];
	}
	return result;
};

// Helper function to get all the teams that have the same field as a given team
const getEligibleTeams = (team: Team, teams: Team[]): Team[] => teams.filter(t => t.schoolName !== team.schoolName && t.teamType === team.teamType);

let rng: () => number;
// Helper function to seed the Math.random() function
const seedRandom = (input: string) => {
	rng = seedrandom(input);
};

// Helper function to get a random number in a range
const getRandom = (min: number, max: number) => rng() * (max - min) + min;

// Helper function to get a random index from an array
const getRandomIndex = (array: any[]) => Math.floor(getRandom(0, array.length));

// Helper function to get a random date

const getRandomDate = (startDate: Date, endDate: Date) => {
	const start = new Date(startDate).getTime();
	const end = new Date(endDate).getTime();
	const randomTimestamp = start + getRandom(0, 1) * (end - start);
	return new Date(randomTimestamp);
};

const getRandomTeam = (teams: Team[]) => teams[getRandomIndex(teams)];

// Helper function to schedule a game between two teams
const scheduleGame = (homeTeam: Team, awayTeam: Team, date: Date, time: TimeType): Game => {
	homeTeam.gamesPlayed++;
	awayTeam.gamesPlayed++;
	homeTeam.opponents.push(awayTeam.schoolName);
	awayTeam.opponents.push(homeTeam.schoolName);
	return { date, time, homeTeam, awayTeam };
};

const createDate = (unavailableDates: Date[], startDate: Date, endDate: Date): Date => {
	let date: Date;
	do {
		date = getRandomDate(startDate, endDate);
	} while (isWeekend(date) || isUnavailable(date, unavailableDates) || date.getUTCDay() === 5);
	return date;
};

const generateSchedule = (teamsArg: Team[], maxGamesPerDay: number, unavailableDates: Date[], startDate: Date, endDate: Date): Game[] => {
	let schedule: Game[] = [];
	for (let j = 0; j < 10; j++) {
		const teams: Team[] = JSON.parse(JSON.stringify(teamsArg));
		seedRandom(JSON.stringify(teams) + String(j));

		schedule = [];

		// Main scheduling loop
		for (let i = 0; i < 20000; i++) {
			for (const team of teams) {
				if (team.gamesPlayed >= 6) {
					continue;
				}

				const eligibleTeams = getEligibleTeams(team, teams);
				// const eligibleAlternateFields = getEligibleAlternateFields(team, teams);
				const opponent = getRandomTeam(eligibleTeams);

				if (opponent.gamesPlayed >= 6) continue;

				// if no opponent is found, skip to the next team
				if (!opponent) continue;

				// Get a random date that is not a weekend or unavailable
				let date = createDate(unavailableDates, startDate, endDate);

				// Schedule the game and add it to the schedules array
				if (team.field === 'single') {
					const week = getWeek(date);
					if (week.includes(date.getDay())) continue;

					schedule.push(scheduleGame(team, opponent, date, '04:45 PM'));
				} else if (team.field === 'double' || team.field === 'none') {
					while (true) {
						const currentGames = schedule.filter(game => game.homeTeam.schoolName === team.schoolName && game.date.toISOString().split('T')[0] === date.toISOString().split('T')[0]);

						if (currentGames.length === 0) {
							schedule.push(scheduleGame(team, opponent as Team, date, '04:45 PM'));
							break;
						} else if (currentGames.length === 1) {
							schedule.push(scheduleGame(team, opponent as Team, date, '06:00 PM'));
							break;
						} else {
							date = createDate(unavailableDates, startDate, endDate);
							continue;
						}
					}
				}

				// Check if the number of games scheduled for that day has reached the maximum
				if (schedule.filter(game => game.date.getTime() === date.getTime()).length === maxGamesPerDay) break;
			}
		}
		const end = teams.filter(team => team.gamesPlayed !== 6);
		if (end.length === 0) break;
	}

	return schedule;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const { body } = req;
	const teamData = body.team_data as TeamPropType[];
	const startEndDate = body.start_end_date as Date[];
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
	res.status(200).json({ schedule: result });
}