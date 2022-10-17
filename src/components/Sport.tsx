const Sport = (props: any) => {
	const activeSport = props.thing;

	return (
		<>
			{activeSport ? (
				<div onClick={props.click} className=" bg-white w-[48%] h-[95%] relative rounded-xl m-2 translate-y-[-1rem] hover:scale-[102%] active:scale-[95%] duration-75 ease-in-out">
					<h1 className=" text-lg font-bold w-fit h-fit absolute inset-0 m-auto">{props.sport}</h1>
				</div>
			) : (
				<div onClick={props.click} className=" bg-gray-400 w-[48%] h-[95%] relative rounded-xl m-2 translate-y-[-1rem] hover:scale-[102%] active:scale-[98%] duration-75 ease-in-out">
					<h1 className="  text-gray-500 text-lg font-bold w-fit h-fit absolute inset-0 m-auto">{props.sport}</h1>
				</div>
			)}
		</>
	);
};

export default Sport;
