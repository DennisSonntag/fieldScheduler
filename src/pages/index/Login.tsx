import { signInWithEmailAndPassword, User } from 'firebase/auth';
import { useEffect, useRef, useState } from 'react';

import auth from './auth';

const Login = () => {
	const [user, setUser] = useState<User>();
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
			const userRaw = await signInWithEmailAndPassword(auth, email, password.value);
			setUser(userRaw.user);
		} catch (errorRaw) {
			const stringErr = (errorRaw.code as string).split('-')[1];
			if (stringErr === 'email') {
				setError(1);
				setErrorContent('Invalid Email please try again!!');
			} else if (stringErr === 'password') {
				setErrorContent('Invalid Password please try again!!');
				setError(2);
			} else {
				setErrorContent('Error try again!!');
				setError(3);
			}
		}
	};

	useEffect(() => {
		if (user) {
			window.location.href = user?.uid;
		}
	}, [user]);

	const forgotPassword = () => {
		// try {
		// 	await sendPasswordResetEmail(auth, "sonntagdennis8@gmail.com")
		// 	alert("Email Sent")
		// } catch (error) {
		// 	const errorCode = error.code;
		// 	const errorMessage = error.message;
		// 	alert("Error")
		// }
	};

	return (
		<div className=" absolute inset-0 m-auto flex h-fit w-fit flex-col text-invert">
			<h1 className="absolute inset-x-0 mx-auto h-fit w-fit text-center text-2xl font-bold ">Sign In</h1>
			<div className="bot-dash field relative my-auto mt-16 mb-4 flex w-full flex-col">
				<input ref={emailRef} autoComplete="off" placeholder=" " type="text" id="email" className="input h-8 w-52 overflow-hidden rounded-md border-0 outline-0" />
				<label htmlFor="email" className="label text-lg ">
					Username
				</label>
			</div>

			<div className="bot-dash field relative my-auto mt-16 mb-4 flex w-full flex-col">
				<input ref={passwordRef} placeholder=" " type="password" id="password" className="input h-8 w-52 overflow-hidden rounded-md border-0 outline-0" />
				<label htmlFor="password" className="label text-lg ">
					Password
				</label>
			</div>

			<div className="flex flex-col items-center gap-2">
				<button type="button" onClick={forgotPassword} className="text-blue underline hover:text-blue-300">
					Forgot Password
				</button>
				<p className={`text-red h-fit w-fit text-center font-bold duration-75 ${error !== 0 ? 'opacity-100' : 'opacity-0'}`}>{errorContent}</p>
				<button
					type="button"
					onClick={login}
					// className={`${
					// 	error === 1 ? "bg-red-500" : `${error === 2 ? "bg-green-500" : `${error === 3 ? "bg-blue-500" : "bg-gray-500"}`}`
					// }  p-2 rounded-sm shadow-lg absolute inset-x-0 mx-auto w-fit duration-75 hover:scale-125 active:scale-90`}
					className={`${error !== 0 ? 'bg-red-700' : 'bg-dim'}  w-fit rounded-sm p-2 shadow-lg duration-75 hover:scale-125 active:scale-90`}
				>
					Login
				</button>
			</div>
		</div>
	);
};
export default Login;
