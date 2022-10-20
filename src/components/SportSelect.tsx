const Sport = ({thing, click, sport}: any) => {
	return (
		<div onClick={click} className={`${thing ? "bg-white" : "bg-gray-400"} w-full h-full relative rounded-xl hover:scale-[1.01] active:scale-[0.95] duration-75 ease-in-out`}>
			<h1 className={`${thing ? "text-black" : "text-gray-500"} text-lg font-bold w-fit h-fit absolute inset-0 m-auto`}>{sport}</h1>
		</div>
	);
};

export default Sport;
