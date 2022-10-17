import { useState } from "react";
import Rugby from "./Rugby";
import Soccer from "./Soccer";
import Sport from "./Sport";
import { signOut } from "firebase/auth";
import auth from "./auth";

const App = () => {
	// false == rugby, true == soccer
	const [rugbyActive, setRugbyActive] = useState(true);
	const [soccerActive, setSoccerActive] = useState(false);

	return (
		<>
			<button
				onClick={() => {
					signOut(auth);
					location.href = "/"
				}}
				className="w-6 h-6 absolute top-2 right-2 hover:scale-125 active:scale-90"
			>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
					<path d="M160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96C43 32 0 75 0 128V384c0 53 43 96 96 96h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H96c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32h64zM504.5 273.4c4.8-4.5 7.5-10.8 7.5-17.4s-2.7-12.9-7.5-17.4l-144-136c-7-6.6-17.2-8.4-26-4.6s-14.5 12.5-14.5 22v72H192c-17.7 0-32 14.3-32 32l0 64c0 17.7 14.3 32 32 32H320v72c0 9.6 5.7 18.2 14.5 22s19 2 26-4.6l144-136z" />
				</svg>
			</button>
			<nav className="flex w-full h-10">
				<Sport
					sport="Rugby"
					thing={rugbyActive}
					click={() => {
						setRugbyActive(true);
						setSoccerActive(false);
					}}
				/>
				<Sport
					sport="Soccer"
					thing={soccerActive}
					click={() => {
						setRugbyActive(false);
						setSoccerActive(true);
					}}
				/>
			</nav>
			{rugbyActive ? <Rugby /> : <Soccer />}
		</>
	);
};

export default App;
