import { useEffect, useRef, useState } from 'react';

import PocketBase, { Record } from 'pocketbase';
import App from '@components/App';

const Login = () => {
	const pb = new PocketBase('http://127.0.0.1:8090');

	const [user, setUser] = useState<Record>();
	const [error, setError] = useState(0);
	const [errorContent, setErrorContent] = useState('');
	const [email, setEmail] = useState('');
	const emailRef = useRef(null);
	const passwordRef = useRef(null);
	const login = async () => {
		try {
			const emailRaw = emailRef.current as unknown as HTMLInputElement;
			setEmail(emailRaw.value);
			const password = passwordRef.current as unknown as HTMLInputElement;
			const userRaw = await pb.collection('users').authWithPassword(email, password.value);
			setUser(userRaw.record);
		} catch (e) {
			setErrorContent('Error try again!!');
			setError(3);
		}
	};

	useEffect(() => {
		if (user) {
			window.location.href = '/main';
		}
	}, [user]);
	const dialogRef = useRef(null);

	const forgotPassword = () => {
		const dialog = dialogRef.current as unknown as any;
		dialog.showModal();
	};

	const closeModal = () => {
		const dialog = dialogRef.current as unknown as any;

		dialog.close();
	};

	return (
		<App title="Login">
			<div className=" absolute inset-0 m-auto flex h-fit w-fit flex-col text-invert">
				<h1 className="my-shadow my-border absolute inset-x-0 mx-auto h-fit w-fit rounded-md bg-main p-2 text-center text-2xl font-bold">Sign In</h1>
				<div className="bot-dash field relative my-auto mt-16 mb-4 flex w-full flex-col">
					<input ref={emailRef} autoComplete="off" placeholder=" " type="text" id="email" className="input h-8 w-52 overflow-hidden rounded-md border-0 outline-0" />
					<label htmlFor="email" className="label text-lg ">
						Email
					</label>
				</div>

				<div className="bot-dash field relative my-auto mt-16 mb-4 flex w-full flex-col">
					<input ref={passwordRef} placeholder=" " type="password" id="password" className="input h-8 w-52 overflow-hidden rounded-md border-0 outline-0" />
					<label htmlFor="password" className="label text-lg ">
						Password
					</label>
				</div>

				<div className="flex flex-col items-center gap-2">
					<button type="button" onClick={forgotPassword} className="text-blue text-blue-300 underline hover:text-blue-400">
						Forgot Password
					</button>
					<dialog className="my-shadow my-border absolute inset-0 m-auto aspect-square h-1/2 rounded-lg bg-main backdrop:bg-black backdrop:opacity-80" ref={dialogRef}>
						<p className="my-shadow my-border absolute inset-x-0 top-4 mx-auto h-fit w-fit rounded-md bg-accent p-2 text-xl font-bold text-stark">Forgot Password</p>
						<input type="text" name="email" className="my-border my-shadow absolute inset-0 m-auto h-10 w-3/4 rounded-md bg-white text-center valid-email" />
						<button type="button" onClick={closeModal} className="smooth-scale my-shadow my-border absolute top-4 right-4 h-fit w-fit rounded-md bg-accent hover:scale-110 active:scale-90">
							<svg className="h-10 w-10 fill-stark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
								<path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
							</svg>
						</button>
						<button type="button" className="my-border my-shadow smooth-scale no-move absolute inset-x-0 bottom-4 mx-auto w-fit h-fit rounded-md bg-accent p-2  text-stark hover:scale-105 active:scale-95">
							Send Reset Email
						</button>
					</dialog>
					<p className={`h-fit w-fit text-center font-bold text-bug duration-75 ${error !== 0 ? 'opacity-100' : 'opacity-0'}`}>{errorContent}</p>
					<button type="button" onClick={login} className={`${error !== 0 ? 'bg-bug' : 'bg-accent'}  my-shadow my-border w-fit rounded-md p-2 duration-75 hover:scale-110 active:scale-90`}>
						Login
					</button>
				</div>
			</div>
		</App>
	);
};
export default Login;
