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
		const dialog = dialogRef.current as unknown as HTMLDialogElement;
		dialog.showModal();
	};

	return (
		<App title="Login">
			<div className=" absolute inset-0 m-auto flex h-fit w-fit flex-col text-invert">
				<h1 className="absolute inset-x-0 mx-auto h-fit w-fit text-center text-2xl font-bold ">Sign In</h1>
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
					<button type="button" onClick={forgotPassword} className="text-blue underline text-blue-300 hover:text-blue-400">
						Forgot Password
					</button>
					<dialog className="h-1/2 aspect-square rounded-lg bg-base shadow-2xl backdrop:bg-black backdrop:opacity-60" ref={dialogRef}>
						<p className="text-center font-bold text-xl">Forgot Password</p>
						<button type="button" className="absolute inset-x-0 mx-auto w-fit h-fit p-2 bg-dim rounded-md hover:scale-105 active:scale-95 smooth text-invert bottom-4 no-move">
							Send Reset Email
						</button>
					</dialog>
					<p className={`text-bug h-fit w-fit text-center font-bold duration-75 ${error !== 0 ? 'opacity-100' : 'opacity-0'}`}>{errorContent}</p>
					<button type="button" onClick={login} className={`${error !== 0 ? 'bg-red-700' : 'bg-mid'}  w-fit rounded-md p-2 shadow-lg duration-75 hover:scale-110 active:scale-90`}>
						Login
					</button>
				</div>
			</div>
		</App>
	);
};
export default Login;
