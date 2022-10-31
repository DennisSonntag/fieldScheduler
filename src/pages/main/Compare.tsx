import Calendar from "./Calender";
import Download from "./Download";
import Sport from "./Sport"
import Title from "./Title";
import { v4 as uuid } from 'uuid';
import Middle from "./Middle";
import data from "@assets/data.json"

const Compare = () => {

	return (
		<Sport>
			<Middle title="Rugby Schedule" events={data.rugbyEvents}/>
			<Middle title="Soccer Schedule" events={data.soccerEvents}/>
		</Sport>
	)
}

export default Compare
