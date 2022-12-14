import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

const schoolNames = [
	'william-aberhart-high-school ',
	'st-francis-high-school ',
	'bowness-high-school ',
	'john-g-diefenbaker-high-school ',
	'crescent-heights-high-school ',
	'dr-gordon-townsend-school ',
	'christine-meikle-school ',
	'louise-dean-school ',
	'james-fowler-high-school ',
	'robert-thirsk-high-school ',
	'sir-winston-churchill-high-school ',
	'nelson-mandela-high-school ',
	'lester-b-pearson-high-school ',
	'notre-dame-high-school ',
	'bishop-mcnally-high-school ',
	'ernest-manning-high-school ',
	'central-memorial-high-school ',
	'william-roper-hull-school ',
	'henry-wise-wood-high-school ',
	'our-lady-of-lourdes-high-school ',
	'bishop-carroll-high-school ',
	'national-sport-school ',
	'st-marys-high-school ',
	'dr-ep-scarlett-high-school ',
	'western-canada-high-school ',
	'bishop-grandin-high-school ',
	'st-anthony-school ',
	'st-anne-academic-centre ',
	'jack-james-high-school ',
	'centennial-high-school ',
	'lord-beaverbrook-high-school ',
	'father-lacombe-high-school ',
	'all-saints-high-school ',
	'bishop-obyrne-high-school ',
	'forest-lawn-high-school ',
];

const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomArray = () =>
	// eslint-disable-next-line implicit-arrow-linebreak
	Array(4)
		.fill(0)
		.map(() => {
			if (Math.random() > 0.5) {
				return getRandomInt(1, 30);
			}
			return 0;
		});

const colors = ['ff0000', 'ffff00', '00ff00', '00ffff', '0000ff', 'ff00ff'];

const calculate = async () => {
	// eslint-disable-next-line no-restricted-syntax, guard-for-in
	for (const name of schoolNames) {
		// example create data
		const data = {
			srGames: {
				2: randomArray(),
				3: randomArray(),
				4: randomArray(),
				5: randomArray(),
			},
			school_id: name,
			jrGames: {
				2: randomArray(),
				3: randomArray(),
				4: randomArray(),
				5: randomArray(),
			},
			team_color: colors[getRandomInt(0, 5)],
		};

		// eslint-disable-next-line no-await-in-loop
		await pb.collection('teams').create(data);
	}
};
export default calculate;
