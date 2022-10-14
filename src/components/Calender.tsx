const Calendar = (props: any) => {
	const year = 2022;
	const month = props.month;
	const date = new Date(year, month);

	let lastDay = new Date(year, month + 1, 0).getDate() - 1;

	const daysInMonth = new Date(year, month + 1, 0).getDate();

	const firstDayIndex = date.getDay() - 1;

	const firstDays = [];
	lastDay -= firstDayIndex;
	for (let i = 0; i <= firstDayIndex; i++) {
		firstDays.push(lastDay);
		lastDay++;
	}

	const days = [];
	for (let i = 1; i <= daysInMonth; i++) {
		days.push(i);
	}

	const daysLeft = 42 - (firstDays.length + days.length);

	const lastDays = [];
	for (let i = 1; i <= daysLeft; i++) {
		lastDays.push(i);
	}

	const events = props.events
	console.log(events[0])

	const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	const weekDays = ["S", "M", "T", "W", "T", "F", "S"];
	let index = 0
	return (
		<>
			<main className="bg-gray-800 w-fit h-fit p-2 rounded-lg">
				<h1 className="text-center text-2xl font-bold">{months[month]}</h1>
				<div className="flex justify-around mb-2">
					{weekDays.map(day => (
						<div>{day}</div>
					))}
				</div>

				<div className="grid grid-cols-7 grid-rows-6 text-center gap-2">
					{firstDays.map(day => (
						<div> </div>
					))}

					{days.map(day => {
						let style = "";
						
						if (events[index] == day) {
							style = "text-red-700";
							index++
						}
						return <div className={style}> {day}</div>;
					})}

					{lastDays.map(day => (
						<div> </div>
					))}
				</div>
			</main>
		</>
	);
};

export default Calendar;
