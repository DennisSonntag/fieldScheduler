import { FormEventHandler, useEffect, useRef, useState } from 'react';

import App from '@components/App';
import eyeOpen from '@svg/eyeOpen.svg';
import eyeClosed from '@svg/eyeClosed.svg';
import { getSession, signIn } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';

const Login = () => {
	const [error, setError] = useState(false);
	const dialogRef = useRef(null);

	const forgotPassword = () => {
		const dialog = dialogRef.current as unknown as any;
		dialog.showModal();
	};

	const closeModal = () => {
		const dialog = dialogRef.current as unknown as any;

		dialog.close();
	};

	const [eyeState, setEyeState] = useState(false);

	const router = useRouter();
	const [userInfo, setUserInfo] = useState({ email: '', password: '' });
	const handleSubmit: FormEventHandler<HTMLFormElement> = async e => {
		e.preventDefault();
		const res = await signIn('credentials', {
			email: userInfo.email,
			password: userInfo.password,
			redirect: false,
		});
		if (res?.ok) {
			setError(false);
			router.push('/main');
		} else {
			setError(true);
		}
	};

	const toggleVisible = () => {
		setEyeState(prev => !prev);
	};

	useEffect(() => {
		if (error) {
			setTimeout(() => {
				setError(false);
			}, 5000);
		}
	}, [error]);

	return (
		<App title="Login">
			<form onSubmit={handleSubmit} className=" absolute inset-0 m-auto flex h-fit w-fit flex-col text-invert">
				<h1 className="my-shadow my-border absolute inset-x-0 mx-auto h-fit w-fit rounded-md bg-main p-2 text-center text-2xl font-bold">Sign In</h1>
				<div className="bot-dash field relative my-auto mt-16 mb-4 flex w-full flex-col">
					<input value={userInfo.email} onChange={({ target }) => setUserInfo({ ...userInfo, email: target.value })} type="email" autoComplete="off" className="input h-8 w-52 overflow-hidden rounded-md border-0 text-red-500 outline-0 valid:text-green-500" />
					<label htmlFor="email" className="label text-lg ">
						Email
					</label>
				</div>

				<div className="bot-dash field relative my-auto mt-16 mb-4 flex w-full flex-col">
					<input value={userInfo.password} onChange={({ target }) => setUserInfo({ ...userInfo, password: target.value })} type={eyeState ? 'text' : 'password'} className="input h-8 w-52 overflow-hidden rounded-md border-0 outline-0" />
					<label htmlFor="password" className="label text-lg ">
						Password
					</label>
					<Image src={eyeState ? eyeOpen : eyeClosed} onClick={toggleVisible} alt="Show Hide Password Button" className="inv absolute right-0 m-2 h-6 w-6 hover:scale-105 active:scale-95" />
				</div>

				<div className="flex flex-col items-center gap-2">
					<button type="button" onClick={forgotPassword} className="text-blue text-blue-500 underline hover:text-blue-400">
						Forgot Password
					</button>

					<dialog className="my-shadow my-border absolute inset-0 m-auto aspect-square h-1/2 rounded-lg bg-main backdrop:bg-black backdrop:opacity-80" ref={dialogRef}>
						<p className="my-shadow my-border absolute inset-x-0 top-4 mx-auto h-fit w-fit rounded-md bg-accent p-2 text-xl font-bold text-stark">Forgot Password</p>
						<input type="email" id="email" name="email" className="my-border my-shadow absolute inset-0 m-auto h-10 w-3/4 rounded-md bg-red-500 text-center valid:bg-green-500" />
						<label htmlFor="email" className="absolute inset-x-0 top-40 mx-auto h-fit w-fit text-2xl font-bold">
							Enter Email To Reset Password
						</label>
						<button type="button" onClick={closeModal} className="smooth-scale my-shadow my-border absolute top-4 right-4 h-fit w-fit rounded-md bg-accent hover:scale-110 active:scale-90">
							<svg className="h-10 w-10 fill-stark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
								<path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
							</svg>
						</button>
						<button type="button" className="my-border my-shadow smooth-scale no-move absolute inset-x-0 bottom-4 mx-auto h-fit w-fit rounded-md bg-accent p-2  text-stark hover:scale-105 active:scale-95">
							Send Reset Email
						</button>
					</dialog>

					<p className={`h-fit w-fit text-center font-bold text-bug duration-300 ${error ? 'opacity-100' : 'opacity-0'}`}>Invalid Info!</p>
					<input type="submit" value="Login" className={`${error ? 'bg-bug' : 'bg-accent'}  my-shadow my-border w-fit rounded-md p-2 duration-75 hover:scale-110 active:scale-90`} />
				</div>
			</form>
		</App>
	);
};
export default Login;

// eslint-disable-next-line consistent-return
export async function getServerSideProps(context: any) {
	const session = await getSession(context);
	if (session) {
		return {
			redirect: {
				destination: '/main',
				permanent: false,
			},
		};
	}

	return {
		props: {
			session,
		},
	};
}
