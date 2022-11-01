import { Theme } from '@components/App';
import { useContext } from 'react';

const ViewBtn = ({ icon, text, setIcon }: any) => {
	const theme = useContext(Theme);

	return (
		<button onClick={() => setIcon()} type="button" className="w-fit h-fit absolute top-0 left-0 hover:scale-110 active:scale-90 no-move m-2 smooth">
			<div className="flex items-center gap-2">
				<img className={` w-8 h-8 ${theme ? null : 'invert'} no-move `} src={icon} alt="" />
				<p className={` w-fit h-fit ${theme ? 'text-dark' : 'text-light'} font-bold`}>{text}</p>
			</div>
		</button>
	);
};
export default ViewBtn;
