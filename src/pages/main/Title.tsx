import { Theme } from '@components/App';
import { useContext } from 'react';

const Title = ({ text }: any) => {
	const theme = useContext(Theme);

	return (
		<div className={`w-[95%] h-10 relative ${theme ? 'bg-dark text-white' : 'bg-light text-black'} rounded-md shadow-lg mt-2`}>
			<h1 className="absolute inset-0 m-auto font-bold w-fit h-fit text-xl">{text}</h1>
		</div>
	);
};
export default Title;
