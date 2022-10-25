import { useState } from "react";
import dateIcon from "../../assets/svg/date.svg";
import Calendar from "./Calender";

const DatePicker = ({ word }: any) => {
	const date = new Date();
	let dd = date.getDate();
	let mm = date.getMonth() + 1;

	let yyyy = date.getFullYear();

	const [open, setOpen] =useState(false)
	return (
		<>
			<div className="text-white flex justify-around items-center rounded-lg shadow-xl hover:scale-110 smooth select-none gap-2 p-2 bg-mid w-fit h-fit">
				<p className="w-fit h-fit">{dd}/{mm}/{yyyy}</p>
				<img onClick={()=> setOpen(prev => !prev)} src={dateIcon} alt="" className="w-8 h-8 active:scale-90 hover:scale-110 smooth cursor-pointer" />
			</div>
			{
				open

				?<Calendar tw="bg-re"  events={[]} month={9}/>
				:null
			}
				
		</>
	);
};

export default DatePicker;
