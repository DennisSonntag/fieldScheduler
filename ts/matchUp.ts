const getRandomArbitrary = (start: number, end: number): Date => new Date(start + Math.random() * (end - start));

const getGameDay = (noWeekends: boolean, noDates: string[], startDate: Date, endDate: Date) => {
	let gameDay;
	do {
		gameDay = new Date(getRandomArbitrary(startDate.getTime(), endDate.getTime()));
		gameDay.setHours(0, 0, 0, 0);
	} while ((noWeekends && (gameDay.getDay() === 0 || gameDay.getDay() === 6)) || noDates.includes(gameDay.toDateString()));
	return gameDay;
};

const scheduleGames = (teamsPerSubdivision: number[], subdivisions: number, noGamesOnWeekends: boolean, noGamesOnDates: string[], maxGamesPerTeam: number, seasonLength: number, startDate: Date, endDate: Date) => {
	// Initialize the schedule as an empty array
	const schedule = [];

	// Initialize an array to keep track of the number of games played by each team
	const gamesPlayed: number[] = [];

	teamsPerSubdivision.forEach(subdivision => {
		const numTeams = teamsPerSubdivision[subdivision];
		for (let team = 0; team < numTeams; team++) {
			gamesPlayed.push(0);
		}
	});

	// Initialize a variable to keep track of the current week
	let currentWeek = 0;

	// Loop through each sub-division
	for (let subDiv = 0; subDiv < subdivisions; subDiv++) {
		const numTeams = teamsPerSubdivision[subDiv];
		// Loop through each team in the current sub-division
		for (let team = 0; team < numTeams; team++) {
			// Loop through each opposing team
			for (let opposition = 0; opposition < numTeams; opposition++) {
				// Make sure the opposing team is not the same as the current team and teams have played less than 6 games
				if (opposition !== team && gamesPlayed[subDiv * numTeams + team] < maxGamesPerTeam && gamesPlayed[subDiv * numTeams + opposition] < maxGamesPerTeam) {
					// Get a random day for the game that is not a weekend and not a no-game date
					const gameDay = getGameDay(noGamesOnWeekends, noGamesOnDates, startDate, endDate);
					// check that no team play more than one game per day
					let team1Playing = false;
					let team2Playing = false;
					schedule.forEach(game => {
						if (game.day === gameDay) {
							if (game.team1 === `${subDiv}-${team}` || game.team2 === `${subDiv}-${team}`) {
								team1Playing = true;
							}
							if (game.team1 === `${subDiv}-${opposition}` || game.team2 === `${subDiv}-${opposition}`) {
								team2Playing = true;
							}
						}
					});
					if (!team1Playing && !team2Playing) {
						// Add the game to the schedule
						schedule.push({
							team1: `${subDiv}-${team}`,
							team2: `${subDiv}-${opposition}`,
							day: gameDay,
							week: currentWeek,
						});
						gamesPlayed[subDiv * numTeams + team]++;
						gamesPlayed[subDiv * numTeams + opposition]++;
						currentWeek++;
						if (currentWeek > seasonLength) currentWeek = 0;
					}
				}
			}
		}
	}
	return schedule;
};

export default scheduleGames;
