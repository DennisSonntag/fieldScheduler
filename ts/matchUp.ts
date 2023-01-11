/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-loop-func */
// /* eslint-disable import/prefer-default-export */
// /* eslint-disable no-continue */
// /* eslint-disable no-restricted-syntax */
// Helper function to get a random date between start and end
const getRandomArbitrary = (start: number, end: number): Date => new Date(start + Math.random() * (end - start));

const getGameDay = (noWeekends: boolean, noDates: string[], startDate: Date, endDate: Date) => {
	let gameDay;
	do {
		gameDay = new Date(getRandomArbitrary(startDate.getTime(), endDate.getTime()));
		gameDay.setHours(0, 0, 0, 0);
	} while ((noWeekends && (gameDay.getDay() === 0 || gameDay.getDay() === 6)) || noDates.includes(gameDay.toDateString()));
	return gameDay;
};

export const scheduleGames = (teamsPerSubdivision: number[], subdivisions: number, noGamesOnWeekends: boolean, noGamesOnDates: string[], maxGamesPerTeam: number, seasonLength: number, startDate: Date, endDate: Date) => {
	// Initialize the schedule as an empty array
	const schedule = [];

	// Initialize an array to keep track of the number of games played by each team
	const gamesPlayed = [];

	for (let sub = 0; sub < subdivisions; sub++) {
		const numTeams = teamsPerSubdivision[sub];
		for (let team = 0; team < numTeams; team++) {
			gamesPlayed.push(0);
		}
	}
	// Initialize a variable to keep track of the current week
	let currentWeek = 0;

	// Loop through each sub-division
	for (let sub = 0; sub < subdivisions; sub++) {
		const numTeams = teamsPerSubdivision[sub];
		// Loop through each team in the current sub-division
		for (let team = 0; team < numTeams; team++) {
			// Loop through each opposing team
			for (let opp = 0; opp < numTeams; opp++) {
				// Make sure the opposing team is not the same as the current team and teams have played less than 6 games
				if (opp !== team && gamesPlayed[sub * numTeams + team] < maxGamesPerTeam && gamesPlayed[sub * numTeams + opp] < maxGamesPerTeam) {
					// Get a random day for the game that is not a weekend and not a no-game date
					const gameDay = getGameDay(noGamesOnWeekends, noGamesOnDates, startDate, endDate);
					// check that no team play more than one game per day
					let team1Playing = false;
					let team2Playing = false;
					schedule.forEach(game => {
						if (game.day === gameDay) {
							if (game.team1 === `${sub}-${team}` || game.team2 === `${sub}-${team}`) {
								team1Playing = true;
							}
							if (game.team1 === `${sub}-${opp}` || game.team2 === `${sub}-${opp}`) {
								team2Playing = true;
							}
						}
					});
					if (!team1Playing && !team2Playing) {
						// Add the game to the schedule
						schedule.push({
							team1: `${sub}-${team}`,
							team2: `${sub}-${opp}`,
							day: gameDay,
							week: currentWeek,
						});
						gamesPlayed[sub * numTeams + team]++;
						gamesPlayed[sub * numTeams + opp]++;
						currentWeek++;
						if (currentWeek > seasonLength) currentWeek = 0;
					}
				}
			}
		}
	}
	return schedule;
};
