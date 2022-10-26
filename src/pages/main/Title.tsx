const Title = ({text}:any) => {
	
	return (
		<>
			<div className="w-[95%] h-10 relative bg-light rounded-md shadow-lg mt-2">
				<h1 className="absolute inset-0 m-auto font-bold w-fit h-fit text-xl">{text}</h1>
			</div>

		</>

	)

}

export default Title