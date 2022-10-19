import arrow from "../../assets/svg/arrow.svg";

const SideBtn = (props:any) => {

	return (
		<>
			<section  className="w-12 pt-4 hover-fade grid place-content-center shrink-0 group ">
				<img
					className={
						props.state
							? `rotate-[${props.deg1}] p-2 w-8 h-8 bg-white rounded-md shadow-lg hover:scale-110 active:scale-95  duration-150 ease-in-out`
							: `group-hover:translate-x-0 translate-x-[${props.sign}] rotate-[${props.deg}] p-2 w-8 h-8 bg-white rounded-md shadow-lg hover:scale-110 active:scale-95 duration-150 ease-in-out`
					}
					onClick={() => props.setState(!props.state)}
					src={arrow}
					alt=""
					srcSet=""
				/>
			</section>
		
		</>
	)
}

export default SideBtn