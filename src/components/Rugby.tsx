import { useState } from "react";

import Sport from "./Sport";
import SideBtn from "./SideBtn";
import Middle from "./Middle";
import Left from "./Left";
import Right from "./Right";

const Main = () => {
	const [rightOpen, setRightOpen] = useState(false);
	const [leftOpen, setLeftOpen] = useState(true);

	return (
		<Sport>
			<Left leftOpen={leftOpen} />

			<SideBtn setState={setLeftOpen} state={leftOpen} side={false} />

			<Middle />

			<SideBtn setState={setRightOpen} state={rightOpen} side={true} />

			<Right rightOpen={rightOpen} />
		</Sport>
	);
};
export default Main;
