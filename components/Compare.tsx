import Middle from './Middle';

const Compare = () => {
	const events = {
		2: [15, 16, 17],
		3: [18, 20],
		4: [6, 17, 27],
		5: [8, 21, 30],
	};
	return (
		<main className="absolute flex h-full w-full flex-row overflow-hidden">
			<Middle title="Rugby Schedule" />
			<Middle title="Soccer Schedule" />
		</main>
	);
};

export default Compare;
