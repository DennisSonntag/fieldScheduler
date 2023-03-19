import { FC } from 'react';

const capitalizeFirstLetter = (string: string) => string.charAt(0).toUpperCase() + string.slice(1);

const Title: FC<{ text: string }> = ({ text }) => (
	<div className="my-shadow my-border relative inset-x-0 mx-auto h-10 w-[95%] rounded-md bg-main text-invert ">
		<h1 className="absolute inset-0 m-auto h-fit w-fit text-xl font-bold">{capitalizeFirstLetter(text)}</h1>
	</div>
);
export default Title;
