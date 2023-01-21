/* eslint-disable no-restricted-syntax */
/* eslint-disable no-continue */

// import crypto from 'crypto';
import seedrandom from 'seedrandom';

type TeamType = 'srBoys' | 'jrBoys' | 'srGirls' | 'jrGirls';

type DivType = 1 | 2 | 3;

export type Team = {
	schoolName: string;
	teamType: TeamType;
	skillDivision: DivType;
	field: 'none' | 'single' | 'double';
	alternateFields?: 'cru' | 'irish';
	gamesPlayed: number;
	opponents: string[];
};

type TimeType = '4:45pm' | '6:00pm';

export type Schedule = {
	date: Date;
	time: TimeType;
	homeTeam: Team;
	awayTeam: Team;
	field?: 'cru' | 'irish';
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

// Helper function to check if two teams have the same field
const haveSameField = (team1: Team, team2: Team): boolean => team1.field === team2.field;

// Helper function to check if two teams have the same alternateFields
const haveSameAlternateField = (team1: Team, team2: Team): boolean => team1.alternateFields === team2.alternateFields;

// Helper function to get all the teams that have the same field as a given team
const getEligibleFields = (team: Team, teams: Team[]): Team[] => teams.filter(t => haveSameField(t, team) && t.schoolName !== team.schoolName);

// Helper function to get all the teams that have the same alternateFields as a given team
const getEligibleAlternateFields = (team: Team, teams: Team[]): Team[] => teams.filter(t => haveSameAlternateField(t, team) && t.schoolName !== team.schoolName);

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

const getRandomTeam = (_teams: Team[]) => {
	const index = getRandomIndex(_teams);
	return _teams[index];
};

// Helper function to schedule a game between two teams
const scheduleGame = (homeTeam: Team, awayTeam: Team, date: Date, time: TimeType): Schedule => {
	homeTeam.gamesPlayed++;
	awayTeam.gamesPlayed++;
	homeTeam.opponents.push(awayTeam.schoolName);
	awayTeam.opponents.push(homeTeam.schoolName);
	return { date, time, homeTeam, awayTeam };
};

const generateSchedule = (teams: Team[], maxGamesPerDay: number, seasonLength: number, unavailableDates: Date[]): Schedule[] => {
	seedRandom(JSON.stringify(teams));

	const schedules: Schedule[] = [];

	// Main scheduling loop
	for (let week = 1; week <= seasonLength; week++) {
		for (const team of teams) {
			if (team.gamesPlayed >= 6) {
				continue;
			}

			const eligibleFields = getEligibleFields(team, teams);
			const eligibleAlternateFields = getEligibleAlternateFields(team, teams);
			let opponent: Team | undefined;

			if (team.field !== 'none') {
				// If the team has a field, try to schedule a game against a team with the same field
				opponent = getRandomTeam(eligibleFields);
				if (!opponent) {
					// If no team with the same field is available, try to schedule a game against a team with the same alternateFields
					opponent = getRandomTeam(eligibleAlternateFields);
				}
			} else {
				// If the team does not have a field, try to schedule a game against a team with the same alternateFields
				opponent = getRandomTeam(eligibleAlternateFields);
			}

			if (!opponent) {
				// if no opponent is found, skip to the next team
				continue;
			}

			// Get a random date that is not a weekend or unavailable
			let date: Date;
			do {
				date = getRandomDate(new Date(2023, 2, week * 7 - 6), new Date(2023, 6, week * 7 - 2));
			} while (isWeekend(date) || isUnavailable(date, unavailableDates) || date.getUTCDay() === 5);

			// Schedule the game and add it to the schedules array
			if (team.field === 'single') {
				schedules.push(scheduleGame(team, opponent, date, '4:45pm'));
			} else if (team.field === 'double') {
				if (team.field === 'double') {
					const opponent1 = getRandomTeam(eligibleFields);
					const opponent2 = getRandomTeam(eligibleFields.filter(o => o !== opponent1));
					schedules.push(scheduleGame(team, opponent1 as Team, date, '4:45pm'));
					schedules.push(scheduleGame(team, opponent2 as Team, date, '6:00pm'));
				}
			}

			// Check if the number of games scheduled for that day has reached the maximum
			if (schedules.filter(s => s.date.getTime() === date.getTime()).length === maxGamesPerDay) {
				break;
			}
		}
	}

	return schedules;
};

export default generateSchedule;
