import { useState } from "react";

const Btn = (props: any) => {
	const [divActive, setDivActive] = useState(false);

	return (
		<>
			<button onClick={() => setDivActive(prev => !prev)} className="w-fit h-fit px-6 py-2 text-center inset-y-0 my-auto bg-white rounded-lg shadow-lg">
				{props.title}
			</button>
			{divActive ? <div className="absolute left-0 w-fit h-fit p-2 bg-white">HEllo</div> : null}
		</>
	);
};

export default Btn;
