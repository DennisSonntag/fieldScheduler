export const makeMatchPairings = (teams: number[]): number[][][] => {
	// if team size is odd add dummy team for calculation
	if (teams.length % 2 === 1) {
		teams.push(0);
	}

	const teamCount: number = teams.length;
	const half: number = teamCount / 2;

	const tournamentPairings: number[][][] = [];

	const teamIndexes: number[] = teams.map((_, i) => i).slice(1);

	for (let round = 0; round < 6; round++) {
		const roundPairings = [];

		const newPlayerIndexes = [0].concat(teamIndexes);

		const firstHalf = newPlayerIndexes.slice(0, half);
		const secondHalf = newPlayerIndexes.slice(half, teamCount).reverse();

		for (let i = 0; i < firstHalf.length; i++) {
			roundPairings.push([teams[firstHalf[i]], teams[secondHalf[i]]]);
		}

		// rotating the array
		teamIndexes.push(teamIndexes.shift() as number);
		tournamentPairings.push(roundPairings);
	}

	return tournamentPairings;
};

export const separatePerTeam = (tournament: number[][][], teamNum: number) =>
	Array(teamNum)
		.fill(0)
		.map((_, i) =>
			tournament
				.flat()
				.filter(elm => elm.includes(i + 1))
				.map(elm => elm.filter(elm2 => elm2 !== i + 1))
				.flat()
				.sort((a, b) => a - b)
		);
