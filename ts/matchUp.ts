export const makeMatchPairings = (teams: number[]): number[][][] => {
	// if team size is odd add dummy team for calculation
	if (teams.length % 2 === 1) {
		teams.push(0);
	}

	const teamCount: number = teams.length;
	const half: number = teamCount / 2;

	const tournamentPairings = [];

	const teamIndexes = teams.map((_, i) => i).slice(1);

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
		.map(
			(_, i) =>
				tournament
					.flat()
					.filter(elm => elm.includes(i + 1))
					.map(elm => elm.filter(elm2 => elm2 !== i + 1))
					.flat()
			// .sort((a, b) => a - b)
		);

export const matchFromDb = (ids: string[]): string[][] => {
	const range = (x: number, y: number): number[] => (x > y ? [] : [x, ...range(x + 1, y)]);
	const raw: number[][] = separatePerTeam(makeMatchPairings(range(1, ids.length)), ids.length);
	const result: string[][] = raw.map(elm => elm.map(elm2 => ids[elm2 - 1]));

	return result;
};

export const scheduleGames = (tourney: string[][]) => {
	// const randInt = (min: number, max: number): number => Math.round(min - 0.5 + Math.random() * (max - min + 1));

	const dates = Array(124).fill(' ');
	// set weekends
	for (let i = 0; i < dates.length; i++) {
		if (i % 6 === 0) {
			dates[i] = '1';
			dates[i + 1] = '1';
		}
	}

	// eslint-disable-next-line no-restricted-syntax
	for (let i = 0; i < tourney.length; i++) {
		for (let j = 0; j < tourney[i].length; j++) {
			let index = j * 20;
			// eslint-disable-next-line no-continue
			if (dates[j * 20] === '1') index++;
			dates[index] = tourney[i][j];
		}
	}

	return dates;
};
