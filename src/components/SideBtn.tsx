import arrow from "../../assets/svg/arrow.svg";

const SideBtn = ({ side, state, setState }: any) => {
	return (
		<section className="grid w-12 pt-4 hover-fade place-content-center shrink-0 group ">
			{side ? (
				<img
					className={
						state
							? `group-hover:opacity-100 opacity-[15%] rotate-180 p-2 w-8 h-8 bg-light rounded-md shadow-lg hover:scale-110 active:scale-95 duration-100 ease-in-out`
							: `group-hover:translate-x-0 translate-x-[200%] rotate-0 p-2 w-8 h-8 bg-light rounded-md shadow-lg hover:scale-110 active:scale-95 duration-100 ease-in-out`
					}
					onClick={() => setState((prev: boolean) => !prev)}
					src={arrow}
					alt="side pane open button"
				/>
			) : (
				<img
					className={
						state
							? `group-hover:opacity-100 opacity-[15%] rotate-0 p-2 w-8 h-8 bg-light rounded-md shadow-lg hover:scale-110 active:scale-95 duration-100 ease-in-out`
							: `group-hover:translate-x-0 translate-x-[-200%] rotate-180 p-2 w-8 h-8 bg-light rounded-md shadow-lg hover:scale-110 active:scale-95 duration-100 ease-in-out`
					}
					onClick={() => setState((prev: boolean) => !prev)}
					src={arrow}
					alt="side pane open button"
				/>
			)}
		</section>
	);
};

export default SideBtn;
