/* eslint-disable no-restricted-syntax */

/* eslint-disable no-continue */

/* eslint-disable no-constant-condition */
import seedrandom from 'seedrandom';

export type TeamType = 'srBoys' | 'jrBoys' | 'srGirls' | 'jrGirls';

export type DivType = 1 | 2 | 3;

export type FieldType = 'none' | 'single' | 'double';
export type AltField = 'cru' | 'irish';

export type Team = {
	schoolName: string;
	teamType: TeamType;
	skillDivision: DivType;
	field: FieldType;
	alternateFields?: AltField;
	gamesPlayed: number;
	opponents: string[];
};

type TimeType = '4:45pm' | '6:00pm';

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
	const date = new Date(day.getTime());
	date.setHours(0, 0, 0, 0);
	// Thursday in current week decides the year.
	date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
	// January 4 is always in week 1.
	const week1 = new Date(date.getFullYear(), 0, 4);
	// Adjust to Thursday in week 1 and count number of weeks from date to week1.
	return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7);
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
const getRandom = (min: number, max: number) => {
	return rng() * (max - min) + min;
};

// Helper function to get a random index from an array
const getRandomIndex = (array: any[]) => Math.floor(getRandom(0, array.length));

// Helper function to get a random date
const getRandomDate = (startDate: Date, endDate: Date) => {
	const start = startDate.getTime();
	const end = endDate.getTime();
	const randomTimestamp = start + getRandom(0, 1) * (end - start);
	return new Date(randomTimestamp);
};

const getRandomTeam = (teams: Team[]) => {
	const index = getRandomIndex(teams);
	return teams[index];
};

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

				if (opponent.gamesPlayed >= 6) {
					continue;
				}

				if (!opponent) {
					// if no opponent is found, skip to the next team
					continue;
				}

				// Get a random date that is not a weekend or unavailable
				let date = createDate(unavailableDates, startDate, endDate);

				// Schedule the game and add it to the schedules array
				if (team.field === 'single') {
					const week = getWeek(date);
					if (week.includes(date.getDay())) {
						continue;
					}
					schedule.push(scheduleGame(team, opponent, date, '4:45pm'));
				} else if (team.field === 'double' || team.field === 'none') {
					while (true) {
						const currentGames = schedule.filter(game => game.homeTeam.schoolName === team.schoolName && game.date.toISOString().split('T')[0] === date.toISOString().split('T')[0]);

						if (currentGames.length === 0) {
							schedule.push(scheduleGame(team, opponent as Team, date, '4:45pm'));
							break;
						} else if (currentGames.length === 1) {
							schedule.push(scheduleGame(team, opponent as Team, date, '6:00pm'));
							break;
						} else {
							date = createDate(unavailableDates, startDate, endDate);
							continue;
						}
					}
				}

				// Check if the number of games scheduled for that day has reached the maximum
				if (schedule.filter(game => game.date.getTime() === date.getTime()).length === maxGamesPerDay) {
					break;
				}
			}
		}
		const end = teams.filter(team => team.gamesPlayed !== 6);
		if (end.length === 0) {
			break;
		}
	}

	return schedule;
};

export default generateSchedule;
