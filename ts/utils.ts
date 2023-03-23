/* eslint-disable no-await-in-loop */

/* eslint-disable no-restricted-syntax */

/* eslint-disable import/prefer-default-export */
import { AltFieldTypes, FieldTypes, TeamType, TeamTypes } from 'pages/api/calculate';
import { pb, possibleData } from 'pages/main';

export const uploadDummyData = async () => {
	// ------------------------------- Create dummy schools--------------------------
	let i = 0;
	const n = Object.keys(possibleData).length;

	for (const code of Object.keys(possibleData)) {
		const hasField = FieldTypes[((Math.floor(i / (n / 4)) + 1) % 5) - 1];
		const altField = AltFieldTypes[Math.random() > 0.5 ? 1 : 0];

		const school = possibleData[code];

		const loopData = {
			school_name: school,
			school_code: code,
			alt_field: altField,
			has_field: hasField,
		};

		await pb.collection('schools').create(loopData);
		i++;
	}

	// ------------------------------- Create dummy teams--------------------------
	const records = await pb.collection('schools').getFullList({
		sort: '-created',
	});
	const n2 = Object.keys(possibleData).length;
	for (let k = 0; k < n2; k++) {
		// const school = possibleData[code];
		const div = (Math.floor(k / (n2 / 3)) + 1) % 4;
		for (let j = 0; j < 4; j++) {
			const loopData = {
				school: records[k].id,
				team_type: TeamTypes[j],
				div,
			};

			await pb.collection('teams').create(loopData);
		}
	}
};
const declarations: { [key: string]: string[] } = {
	'Bishop Carroll': ['SrGirls Div1', 'SrBoys Div1'],
	'Ernest Manning': ['SrGirls Div1', 'SrBoys Div1', 'JrBoys Div1'],
	'Notre Dame': ['SrGirls Div1', 'SrBoys Div1', 'JrBoys Div1'],
	'St.Francis': ['SrGirls Div1', 'SrBoys Div1', 'JrBoys Div1'],
	'Western Canada': ['SrGirls Div1', 'SrBoys Div1', 'JrBoys Div1'],
	'Henry Wise Wood': ['SrGirls Div1', 'SrBoys Div1', 'JrBoys Div1'],
	Bowness: ['SrBoys Div1', 'JrBoys Div1', 'SrGirls Div2'],
	'All Saints': ['JrBoys Div1', 'SrGirls Div2', 'SrBoys Div2'],
	Centennial: ['JrBoys Div1', 'SrGirls Div2', 'SrBoys Div2'],
	'Dr.E.P.Scarlett': ['JrBoys Div1', 'SrGirls Div2', 'SrBoys Div2'],
	'Lester B.Pearson': ['JrBoys Div1', 'SrBoys Div2', 'SrGirls Div3'],
	'William Aberhart': ['JrBoys Div1', 'SrGirls Div2', 'SrBoys Div2'],
	'Sir Winston Churchill': ['SrGirls Div2', 'SrBoys Div2'],
	'Lord Beaverbrook': ['SrGirls Div2', 'SrBoys Div3'],
	'St.Mary’s': ['SrGirls Div2', 'SrBoys Div3'],
	'Our Lady Of The Rockies': ['SrGirls Div2', 'SrBoys Div2'],
	'Joane Cardinal Schubert- TBD': ['SrBoys Div2', 'SrGirls Div3'],
	'Robert Thirsk': ['SrBoys Div2', 'SrGirls Div3'],
	'Bishop O’Byrne': ['SrBoys Div2'],
	'Bishop McNally': ['SrGirls Div3', 'SrBoys Div3'],
	'Central Memorial': ['SrGirls Div3', 'SrBoys Div3'],
	'Crescent Heights': ['SrGirls Div3', 'SrBoys Div3'],
	'Father Lacombe': ['SrGirls Div3'],
	'Forest Lawn': ['SrGirls Div3', 'SrBoys Div3'],
	'John G.Diefenbaker': ['SrGirls Div3', 'SrBoys Div3'],
	'Nelson Mandela': ['SrGirls Div3'],
	'James Fowler': ['SrGirls Div3', 'SrBoys Div3'],
};

const lowercaseFirstLetter = (string: string) => string.charAt(0).toLowerCase() + string.slice(1);

export const uploadTestData = async () => {
	let i = 0;
	const n = Object.keys(declarations).length;
	for (const school of Object.keys(declarations)) {
		const code = school
			.split(' ')
			.map(elm => elm[0])
			.join('');
		const hasField = FieldTypes[((Math.floor(i / (n / 4)) + 1) % 5) - 1];
		const altField = AltFieldTypes[Math.random() > 0.5 ? 1 : 0];

		const loopData1 = {
			school_name: school,
			school_code: code,
			alt_field: altField,
			has_field: hasField,
		};

		await pb.collection('schools').create(loopData1);
		i++;
	}

	const records = await pb.collection('schools').getFullList({
		sort: '-created',
	});
	let k = 0;
	for (const school2 of Object.keys(declarations)) {
		const delcaredTeamTypes = declarations[school2].map(elm => lowercaseFirstLetter(elm.split(' ')[0]));
		const div = declarations[school2].map(elm => Number(elm.split(' ')[1].replace(/\D/g, '')));
		let p = 0;
		for (const team of delcaredTeamTypes) {
			const loopData = {
				school: records[k].id,
				team_type: team as TeamType,
				div: div[p],
			};

			await pb.collection('teams').create(loopData);
			p++;
		}
		k++;
	}
};

export const removeAllData = async () => {
	const teamRecords = await pb.collection('teams').getFullList({
		sort: '-created',
	});
	for (const team of teamRecords) {
		await pb.collection('teams').delete(team.id);
	}

	const schoolRecords = await pb.collection('schools').getFullList({
		sort: '-created',
	});
	for (const school of schoolRecords) {
		await pb.collection('schools').delete(school.id);
	}
};
