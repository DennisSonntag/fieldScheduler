const Sport = ({thing, click, sport}: any) => {
	return (
		<div onClick={click} className={`${thing ? "bg-light" : "bg-mid"} w-[16rem] h-[2.5rem] relative ${sport === "Rugby" ? "rounded-bl-[5rem] shadow-2xl" : "shadow-2xl rounded-br-[5rem]"} hover:w-[20rem] origin-center active:scale-[0.95] duration-75 ease-in-out`}>
			<h1 className={`${thing ? "text-black" : "text-gray-500"} text-lg font-bold w-fit h-fit absolute inset-0 m-auto`}>{sport}</h1>
		</div>
	);
};

export default Sport;
