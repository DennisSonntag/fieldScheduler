const Title = ({ text }: any) => (
	<div className="relative mt-2 h-10  w-[95%] rounded-md bg-base text-stark shadow-lg">
		<h1 className="absolute inset-0 m-auto h-fit w-fit text-xl font-bold">{text}</h1>
	</div>
);
export default Title;
