import gif from '@img/404.gif';
import Image from 'next/image';
import App from '@components/App';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const NotFound = () => {
	const router = useRouter();

	useEffect(() => {
		setTimeout(() => {
			router.push('/');
		}, 3000);
	}, []);

	return (
		<App title="Page Not Found">
			<div className="absolute inset-0 m-auto grid h-fit w-fit gap-4">
				<p className="my-border my-shadow relative rounded-md p-2 text-center text-[3rem] font-bold text-red-700">404 PAGE NOT FOUND</p>
				<Image className="my-shadow my-border relative mx-auto w-[30rem] rounded-md" src={gif} alt="" />
			</div>
		</App>
	);
};
export default NotFound;
