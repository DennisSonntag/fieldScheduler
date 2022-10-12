import Calendar from 'react-calendar';
import { useState } from 'react';

const Cal = (props: any) => {
	const [date, setDate] = useState(null);
	return (
		<Calendar
			className="w-[calc(w-fit/30%)] h-[calc(h-fit)] bg-white p-2 rounded-lg "
			onChange={(arg: any) => setDate(arg)}
			value={date}
			defaultValue={new Date(2023, props.month)}
		/>
	);
};

export default Cal;
