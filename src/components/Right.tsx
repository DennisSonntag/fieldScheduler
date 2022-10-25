import DatePicker from "./DatePicker";

const Left = ({ rightOpen }: any) => {
	return (
		<section className={` ${rightOpen ? "w-1/2 " : "w-0 translate-x-full"} h-full relative hover-fade overflow-hidden duration-200 ease-in-out`}>
			<div className="w-[95%] h-10 absolute inset-x-0 mx-auto bg-light rounded-md shadow-lg mt-2">
				<h1 className="absolute inset-0 m-auto font-bold w-fit h-fit">Add/Edit Events</h1>
			</div>
			<div className="w-full h-full py-6 translate-y-8">

				<h1 className="text-center">Season Start/End</h1>
				<div className="flex justify-around">
					<DatePicker word="sus"/>
				</div>
				<div className="flex justify-around">
					<DatePicker word="sus"/>
				</div>

				<h1 className="text-center">Breaks/Holidays</h1>
				<div className="flex justify-around">
					<DatePicker word="sus"/>
				</div>
			</div>
		</section>
	);
};

export default Left;
