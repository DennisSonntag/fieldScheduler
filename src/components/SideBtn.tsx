import arrow from "../../assets/svg/arrow.svg";

const SideBtn = (props: any) => {
	const side = props.side;

	return (
		<section className="w-12 pt-4 hover-fade grid place-content-center shrink-0 group ">
			<img
				className={
					props.state
						? `rotate-[${side ? "180deg" : "0deg"}] p-2 w-8 h-8 bg-white rounded-md shadow-lg hover:scale-110 active:scale-95  duration-150 ease-in-out`
						: `group-hover:translate-x-0 translate-x-[${side ? "130%" : "-130%"}] rotate-[${
								side ? "0deg" : "180deg"
						  }] p-2 w-8 h-8 bg-white rounded-md shadow-lg hover:scale-110 active:scale-95 duration-150 ease-in-out`
				}
				onClick={() => props.setState((prev: boolean) => !prev)}
				src={arrow}
				alt="side pane open button"
			/>
		</section>
	);
};

export default SideBtn;
