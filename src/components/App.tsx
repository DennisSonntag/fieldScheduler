import { CSVLink } from 'react-csv';
import { useState } from 'react';
import DatePicker from 'react-date-picker';
import Cal from './Calender';

const App = () => {
	const csvData = [
		['firstname', 'lastname', 'email'],
		['Ahmed', 'Tomi', 'ah@smthing.co.com'],
		['Raed', 'Labes', 'rl@smthing.co.com'],
		['Yezzi', 'Min l3b', 'ymin@cocococo.com'],
	];

	const [divActive, setDivActive] = useState(false);
	const [startDate, setStartDate] = useState(null);
	const months = [1, 2, 3, 4, 5, 6];

	return (
		<>
			<div className="m-0 p-10 h-screen w-screen bg-white box-border drop-shadow-2xl">
				<main className="w-full h-full rounded-xl shadow-2xl border-black border">
					<nav className="flex w-full h-10">
						<div className="hover:bg-stone-400 bg-stone-700 w-full h-full grid justify-center relative border-black border-r-2">
							<h1 className=" text-lg font-bold w-fit h-fit absolute inset-0 m-auto">Rugby</h1>
						</div>

						<div className="hover:bg-stone-700 bg-stone-400 w-full h-full grid justify-center relative ">
							<h1 className="text-lg text-gray-500 font-bold w-fit h-fit absolute inset-0 m-auto color">Soccer</h1>
						</div>
					</nav>

					<section className="flex w-full h-[calc(100%-2.5rem)]">
						<div className="w-1/2 h-full bg-gray-500 border-black border rounded-bl-xl">
							<div className="w-full h-10 relative">
								<h1 className="font-bold absolute w-fit h-fit inset-0 m-auto">Teams</h1>
							</div>

							<div className="flex w-ful h-10 ">
								<button onClick={() => setDivActive(prev => !prev)} className="w-full text-center inset-y-0 my-auto">
									Div n 
								</button>
								{divActive ? <div className="absolute w-fit h-fit p-2 bg-white">HEllo</div> : null}

								<button onClick={() => setDivActive(prev => !prev)} className="w-full text-center inset-y-0 my-auto">
									School 
								</button>
								{divActive ? <div className="absolute w-fit h-fit p-2 bg-white">HEllo</div> : null}

								<button onClick={() => setDivActive(prev => !prev)} className="w-full text-center inset-y-0 my-auto">
									Jr/Sr 
								</button>
								{divActive ? <div className="absolute w-fit h-fit p-2 bg-white">HEllo</div> : null}
							</div>
						</div>

						<div className="w-full h-full bg-gray-500 border-black border flex flex-col">
							<div className="w-full h-10 relative">
								<p className="font-bold absolute w-fit h-fit inset-0 m-auto">Schedule</p>
							</div>

							<section className="bg-black h-5/6 w-full relative grid  grid-cols-3 grid-rows-2 p-2 gap-2">
								{months.map((month) => (
									<Cal month={month} />
								))}
							</section>

							<section className="w-full bg-black h-[10%] grid place-content-center">
								<button className="w-fit h-fit p-2 rounded-lg bg-white hover:scale-110 active:scale-90 duration-75 ease-in-out">
									<CSVLink filename={'test.csv'} data={csvData}>
										Download csv
									</CSVLink>
								</button>
							</section>
						</div>

						<div className="w-1/2 h-full bg-gray-500 border-black border rounded-br-xl flex flex-col ">
							<div className="w-full h-10 relative">
								<h1 className="font-bold absolute w-fit h-fit inset-0 m-auto">Add/Edit Events</h1>
							</div>
							<div className="w-full h-full py-6">
								<h1 className="text-center">Season Start/End</h1>
								<div className="flex justify-around">
									<p>Start</p>
									<DatePicker onChange={(arg: any) => setStartDate(arg)} value={startDate} />
								</div>

								<div className="flex justify-around">
									<p>End</p>
									<DatePicker onChange={(arg: any) => setStartDate(arg)} value={startDate} />
								</div>
							</div>

							<div className="w-full h-full py-6">
								<h1 className="text-center">Breaks/Holidays</h1>
								<div className="flex justify-around">
									<p>Event</p>
									<DatePicker onChange={(arg: any) => setStartDate(arg)} value={startDate} />
								</div>
							</div>
						</div>
					</section>
				</main>
			</div>
		</>
	);
};

export default App;
