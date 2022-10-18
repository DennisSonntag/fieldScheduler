const Sport = (props: any) => {
	const activeSport = props.thing;


	return (
		<>
			{activeSport ? (
				<div onClick={props.click} className=" bg-white w-full h-full relative rounded-xl hover:scale-[1.01] active:scale-[0.95] duration-75 ease-in-out">
					<h1 className=" text-lg font-bold w-fit h-fit absolute inset-0 m-auto">{props.sport}</h1>
				</div>
			) : (
				<div  onClick={props.click} className=" bg-gray-400 w-full h-full relative rounded-xl hover:scale-[1.01] active:scale-[0.95] duration-75 ease-in-out">
					<h1 className="  text-gray-500 text-lg font-bold w-fit h-fit absolute inset-0 m-auto">{props.sport}</h1>
				</div>
			)}
		</>
	);
};

export default Sport;
