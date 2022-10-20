const Sport = (props: any) => {
	const activeSport = props.thing;

	return (
		<div onClick={props.click} className={`${activeSport ? "bg-white" : "bg-gray-400"} w-full h-full relative rounded-xl hover:scale-[1.01] active:scale-[0.95] duration-75 ease-in-out`}>
			<h1 className={`${activeSport ? "text-black" : "text-gray-500"} text-lg font-bold w-fit h-fit absolute inset-0 m-auto`}>{props.sport}</h1>
		</div>
	);
};

export default Sport;
