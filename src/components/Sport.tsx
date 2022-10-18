const Sport = (props: any) => {
	return (
		<>
			<main className="w-full h-[calc(101%-4rem)] rounded-xl shadow-2xl ">
				<section className="flex w-full h-[calc(100%-4rem)] bg-gray-700 rounded-xl">{props.children}</section>
			</main>
		</>
	);
};

export default Sport;
