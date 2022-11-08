import gif from '@img/404.gif';
import App from './App';

const NotFound = () => (
	<App>
		<div className="absolute inset-0  m-auto grid h-fit w-fit place-content-center gap-4 p-2">
			<p className="text-center text-[3rem] font-bold text-red-700">404 PAGE NOT FOUND</p>
			<img className="rounded-md shadow-2xl" src={gif} alt="" />
		</div>
	</App>
);
export default NotFound;
