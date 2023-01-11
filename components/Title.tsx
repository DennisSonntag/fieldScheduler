interface PropType {
	text: string;
}

const Title = ({ text }: PropType) => (
	<div className="my-shadow my-border relative mt-2  h-10 w-[95%] rounded-md bg-main text-invert ">
		<h1 className="absolute inset-0 m-auto h-fit w-fit text-xl font-bold">{text}</h1>
	</div>
);
export default Title;
