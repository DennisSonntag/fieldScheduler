import DatePicker from "./DatePicker";
import Title from "./Title";

const Left = ({ rightOpen }: any) => {
	return (
		<section className={` ${rightOpen ? "w-1/2 " : "w-0 translate-x-full"} gap-2 h-full relative items-center flex flex-col hover-fade overflow-hidden duration-200 ease-in-out`}>
			<Title text="Add/Edit Events"/>

			<div className="relative gap-2  flex-grow flex flex-col  items-center w-full">
				<h1 className="text-center py-2 px-8 rounded-md shadow-xl bg-light font-bold text-md">Season Start/End</h1>
				<DatePicker word="sus" />
				<DatePicker word="sus" />

				<div className="h-10"></div>

				<h1 className="text-center py-2 px-8 rounded-md shadow-xl bg-light font-bold text-md">Breaks/Holidays</h1>
				<DatePicker word="sus" />
			</div>
		</section>
	);
};

export default Left;
